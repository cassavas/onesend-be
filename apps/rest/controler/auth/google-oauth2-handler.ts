import passport from 'passport';
import express from 'express';
import { isUserExists } from 'shared/services/user/is-user-exists';
import { registerService } from 'shared/services/user/register-service';
import { insertTokenRepo } from 'shared/database/repository/auth/insert-token-repo';
import { LoginPayloadResponse } from 'shared/types/auth';
import { responseSuccess } from 'rest/middleware/response/success';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = (req: express.Request, res: express.Response) => {
  passport.authenticate('google', { failureRedirect: '/' }, async (err, user, info) => {
    if (err || !user) {
      throw err;
    }

    const email = user._json.email;
    const lastName = user._json.family_name;
    const firstName = user._json.given_name;

    const dbUser = await isUserExists(email);

    if (!dbUser) {
      const payload = await registerService(email, firstName, lastName, 'google');

      responseSuccess(req, res, payload as LoginPayloadResponse);
      return;
    }

    const accessToken = global._crypto.generateAuthToken(email);

    const date = new Date();
    date.setDate(date.getDate() + 30);
    insertTokenRepo(accessToken, dbUser.id, date);

    const payload: LoginPayloadResponse = {
      accessToken: accessToken,
      user: {
        id: dbUser.publicId,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        expired: date
      }
    };

    responseSuccess(req, res, payload);
  })(req, res);
};
