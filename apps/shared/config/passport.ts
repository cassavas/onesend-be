import passport from 'passport';
import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
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

export const generateToken = (userId: string, firstName: string, lastName: string, email: string): string => {
  const payload = {
    userId,
    firstName,
    lastName,
    email
  };

  return jwt.sign(payload, process.env.SECRET_TOKEN as string, { expiresIn: '30d' });
};
