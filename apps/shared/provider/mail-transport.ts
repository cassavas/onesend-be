import nodemailer from 'nodemailer';

export class MailTransport {
  private async _transporter() {
    return nodemailer.createTransport({
      host: 'pro34.emailserver.vn',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  public async send(to: string, subject: string, message: string | any) {
    const sender = await this._transporter();

    await sender.sendMail({
      from: {
        name: 'onesend',
        address: process.env.EMAIL ?? ''
      },
      to,
      subject,
      html: message
    });
  }
}
