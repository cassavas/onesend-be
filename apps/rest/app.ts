import 'shared/config/passport';
import express from 'express';
import session from 'express-session';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';
import passport from 'passport';

import { context } from 'rest/middleware/context';
import { catchHandler } from './middleware/catch-handler';
import { loginHandler } from 'rest/controler/user/postLoginHandler';
import cookieParser from 'cookie-parser';
import { apiLimiter } from 'rest/config/rateLimit';
import { cors } from 'rest/config/cors';
import { registerHandler } from 'rest/controler/user/postSignUpHandler';
import { googleAuth, googleAuthCallback } from 'rest/controler/auth/google-oauth2-handler';
const app = express();

app.set('trust proxy', 'loopback');
app.all('*', cors);
app.all('*', apiLimiter);
app.use(bodyParser.json({ limit: '1mb' }));

app.use(
  session({
    secret: process.env.SECRET_TOKEN ?? '',
    resave: false,
    saveUninitialized: true
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'live' });
});

app.get('/v1/auth/google', googleAuth);
app.get('/v1/auth/google/callback', googleAuthCallback);

app.post('/v1/login', context, asyncHandler(catchHandler(loginHandler)));
app.post('/v1/sign-up', context, asyncHandler(catchHandler(registerHandler)));
app.post('/v1/request-upload/:customer-id');
app.post('/v1/upload/:customer-id');
app.post('/v1/requests/:customer-id');

export default app;
