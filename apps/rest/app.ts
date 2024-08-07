import 'shared/config/passport';
import express from 'express';
import session from 'express-session';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';
import passport from 'passport';

import { context } from 'rest/middleware/context';
import { catchHandler } from './middleware/catch-handler';
import { postSignInHandler } from 'rest/controler/auth/post-sign-in-handler';
import cookieParser from 'cookie-parser';
import { apiLimiter } from 'rest/config/rateLimit';
import { cors } from 'rest/config/cors';
import { postSignUpHandler } from 'rest/controler/auth/post-sign-up-handler';
import { googleAuth, googleAuthCallback } from 'rest/controler/auth/google-oauth2-handler';
import { getUserCheckHandler } from 'rest/controler/auth/get-user-check-handler';
import { auth } from 'rest/middleware/auth/api-auth';
import { getVerifySignUpHandler } from 'rest/controler/auth/get-verify-sign-up-handler';
import { deleteSignOutHandler } from 'rest/controler/auth/delete-sign-out-handler';
import { getUserProfileHandler } from 'rest/controler/user/get-user-profile-handler';
import { postUserProfileHandler } from 'rest/controler/user/post-user-profile-handler';
import { postSetupProjectHandler } from 'rest/controler/project/post-setup-project-handler';
import { getProjectHandler } from 'rest/controler/project/get-project-handler';
import { getListProjectHandler } from 'rest/controler/project/get-list-project-handler';
import { deleteForceLogoutHandler } from 'rest/controler/auth/delete-force-logout-handler';

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

app.get('/auth/google', googleAuth);
app.get('/auth/google/callback', context, googleAuthCallback);

app.get('/v1/user/check/:email', context, asyncHandler(catchHandler(getUserCheckHandler)));

app.post('/v1/auth/sign-in', context, asyncHandler(catchHandler(postSignInHandler)));
app.post('/v1/auth/sign-up', context, asyncHandler(catchHandler(postSignUpHandler)));
app.delete('/v1/auth/sign-out', context, auth, asyncHandler(catchHandler(deleteSignOutHandler)));
app.get('/v1/auth/verify', context, asyncHandler(catchHandler(getVerifySignUpHandler)));

app.get('/v1/user/profile', context, auth, asyncHandler(catchHandler(getUserProfileHandler)));
app.post('/v1/user/update-profile', context, auth, asyncHandler(catchHandler(postUserProfileHandler)));

app.post('/v1/project', context, auth, asyncHandler(catchHandler(postSetupProjectHandler)));
app.get('/v1/project/:publicId', context, auth, asyncHandler(catchHandler(getProjectHandler)));
app.get('/v1/projects', context, auth, asyncHandler(catchHandler(getListProjectHandler)));

app.delete('/v1/auth/force-logout', context, auth, asyncHandler(catchHandler(deleteForceLogoutHandler)));
//global APIs

export default app;
