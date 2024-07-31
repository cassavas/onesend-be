import { userValidation } from 'shared/helpers/validation';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { resetPasswordSubject } from 'shared/types/const';
import { resetPasswordTemplate } from 'shared/types/template/resetPasswordEmail';

const cron = require('node-cron');

const limitRequest = 5;
let requestId = 0;
let limitRequestArray: { id: string; email: string; requestId: number }[] = [];

cron.schedule('0 0 * * *', async () => {
  limitRequestArray = [];
  requestId = 0;
});

export const requestResetPassword = async (email: string) => {
  const user = await userValidation(email);

  let countNumberRequested = limitRequestArray.filter((userRequest) => userRequest?.email === user.email);

  if (user.type !== 'standard') {
    throw new LogError(ErrorVars.E009_USER_METHOD_NOT_ALLOW, 'LOGIC');
  }

  if (countNumberRequested.length < limitRequest) {
    requestId++;
    const userRequest = {
      id: user.publicId,
      email: user.email,
      requestId: requestId
    };
    limitRequestArray.push(userRequest);

    const token = global._crypto.signActiveToken({ email: user.email });
    await global.sender.send(email, resetPasswordSubject, resetPasswordTemplate(`https://${process.env.HOST}/auth/URL?token=${token}`));
  } else {
    throw new LogError(ErrorVars.E013_INVALID_REQUEST, 'LOGIC');
  }
};
