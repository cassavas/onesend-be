import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIEND_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
      callbackURL: '/auth/google/callback'
    },
    (accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
      return done(null, profile);
    }
  )
);

export const generateToken = (user: Profile): string => {
  const payload = {
    sub: user.id,
    name: user.displayName,
    email: user.emails ? user.emails[0].value : ''
  };
  console.log(user);

  return jwt.sign(payload, process.env.SECRET_TOKEN as string, { expiresIn: '1h' });
};
