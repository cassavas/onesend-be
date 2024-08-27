export type Services = {
  base_url: string;
  name: string;
  services: {
    [key: string]: string;
  };
}[];

const sharedServices: Services = [
  {
    base_url: process.env.TELECOM_API_HOST ?? '',
    name: 'telecom_service',
    services: {
      get_balance: 'GET /apidebit/getBalance',
      post_sms: 'POST /apidebit/sendSMS'
    }
  }
];

export default sharedServices;
