import { doHttp } from 'shared/helpers/http-client';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export class SmsGateway {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = `Basic ${process.env.TELECOM_SECRET_KEY}`;
  }

  public sendSms = async (to: string, content: string, brand: string, callback?: 0 | 1, smsid?: string) => {
    const res:
      | {
          status: number;
          errorcode: number;
          debug: string;
          description: string;
          carrier: string;
        }
      | any = await doHttp({
      serviceName: 'post_sms',
      headers: {
        Authorization: this.apiKey
      },
      body: {
        from: brand,
        text: content,
        dlr: callback,
        to: to,
        smsid
      }
    });

    if (!res) {
      throw new LogError(ErrorVars.E015_SMS_SEND_FAILURE);
    }

    return {
      error:
        res.status === 1
          ? null
          : {
              code: res.errorcode,
              description: res.errordescription
            },
      carrier: res.carrier,
      success: res.status === 1
    };
  };
}
