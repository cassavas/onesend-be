export enum OTP_STATUS {
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  DONE = 'DONE',
  FAILURE = 'FAILURE'
}

class SmsServiceRepoRepo {
  public async logOtpHistory(publicId: string, projectId: number, message: string, otp: string, createdBy: number, status: OTP_STATUS, carrier: string, country: string, errorCode?: number): Promise<void> {
    const now = new Date();
    await global.prisma.otpHistory.create({
      data: {
        publicId,
        projectId,
        message,
        otp,
        createdBy,
        createdAt: now,
        updatedAt: now,
        carrier: carrier,
        country,
        type: 'sms',
        status: status,
        error: errorCode ? this.providerErrorParser(errorCode) : null
      }
    });
  }

  private providerErrorParser = (errorCode: number) => {
    switch (errorCode) {
      case 40:
        return 'Unauthorized';
      case 41:
        return 'Unauthorized-Invalid Password';
      case 42:
        return 'Unauthorized-Invalid User';
      case 51:
        return 'Invalid IP';
      case 52:
        return 'Invalid input params';
      case 53:
        return 'Invalid phone number';
      case 531:
        return 'Invalid phone number: Mobile number portability';
      case 54:
        return 'Invalid Sender';
      case 55:
        return 'Invalid Content';
      case 551:
        return 'Invalid Content: Invalid Message Length';
      case 50:
        return 'Gateway error';
      case 80:
        return 'Type account not allow send SMS debit via API';
      case 81:
        return 'Your account not allow send SMS debit';
      case 82:
        return 'Account over quota';
    }
    return errorCode.toString();
  };
}

export default new SmsServiceRepoRepo();
