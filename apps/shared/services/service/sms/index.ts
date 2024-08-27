import ProjectRepository from 'shared/database/repository/project';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { alpha2ToAlpha3, HOLD_BALANCE } from 'shared/types/const';
import { userValidationById } from 'shared/helpers/validation';
import { SmsGateway } from 'shared/provider/sms-gateway';
import { newPublicId } from 'shared/helpers/function';
import SmsServiceRepo, { OTP_STATUS } from 'shared/database/repository/services/sms-service-repo';
import parsePhoneNumber from 'libphonenumber-js';

export type SendSmsPayload = {
  to: string;
  content: string;
  brand: string;
  otp: string;
};

class SmsService {
  private async sendSms(to: string, content: string, brand: string, smsid?: string) {
    const smsProvider = new SmsGateway();
    return await smsProvider.sendSms(to, content, brand, 1, smsid);
  }

  public async sendDemoSms(userId: number, projectPublicId: string, payload: SendSmsPayload) {
    if (!payload.content || !payload.brand || !payload.otp) {
      throw new LogError(ErrorVars.E017_MISSING_DATA, 'LOGIC');
    }

    const phoneNumberParser = parsePhoneNumber(payload.to);

    if (!phoneNumberParser) {
      throw new LogError(ErrorVars.E010_PHONE_NUMBER_INVALID, 'LOGIC');
    }

    const alpha2Code = phoneNumberParser.country;

    const alpha3Country = alpha2ToAlpha3[alpha2Code ?? ''];
    if (!alpha3Country) {
      throw new LogError(ErrorVars.E018_COUNTRY_INVALID, 'LOGIC');
    }

    const user = await userValidationById(userId);
    const project = await ProjectRepository.getProject(user.id, projectPublicId);

    if (!project) {
      throw new LogError(ErrorVars.E014_RESOURCE_NOT_FOUND, 'LOGIC');
    }

    if (project.balance <= HOLD_BALANCE) {
      throw new LogError(ErrorVars.E016_BALANCE_INSUFFICIENT, 'LOGIC');
    }

    const smsId = newPublicId();

    const res = await this.sendSms(payload.to, payload.content, payload.brand, smsId);

    if (!res.success) {
      if ([80, 81, 82, 51].includes(res.error!.code)) {
        throw new LogError(ErrorVars.E020_SMS_PROVIDER_NOT_READY, 'INTERNAL');
      }

      SmsServiceRepo.logOtpHistory(smsId, project.id, payload.content, payload.otp, user.id, OTP_STATUS.FAILURE, res?.carrier || '', alpha3Country, res.error!.code);
      throw new LogError(ErrorVars.E015_SMS_SEND_FAILURE, 'LOGIC');
    }

    SmsServiceRepo.logOtpHistory(smsId, project.id, payload.content, payload.otp, user.id, OTP_STATUS.DONE, res?.carrier || '', alpha3Country);

    const plan = project.Plan.name.toLowerCase();
    const smsCommited = project.smsCommited;

    if (plan !== 'base' && smsCommited > 0) {
      ProjectRepository.processDecreaseSmsCommited(project.id);
      return;
    }

    const smsFeeRecord = await ProjectRepository.getSmsServiceFree(alpha3Country, res.carrier);
    console.log(alpha3Country, res.carrier, smsFeeRecord);
    if (!smsFeeRecord) {
      throw new LogError(ErrorVars.E019_INFORMATION_NOT_EXISTS, 'INTERNAL');
    }

    let smsFee = 0;

    switch (plan) {
      case 'base':
        smsFee = smsFeeRecord.base;
        break;
      case 'standard':
        smsFee = smsFeeRecord.standard;
        break;
      case 'business':
        smsFee = smsFeeRecord.business;
        break;
      case 'enterprise':
        smsFee = smsFeeRecord.enterprise;
        break;
    }

    ProjectRepository.processDebitBalance(project.id, smsFee);
  }
}

export default new SmsService();
