import passport from 'passport';
import { generateToken } from 'shared/config/passport';
import express from 'express';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = (req: express.Request, res: express.Response) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
    if (err || !user) {
      throw err;
    }

    console.log(user);
    const token = generateToken(user);
    res.send({ token });
  })(req, res);
};
