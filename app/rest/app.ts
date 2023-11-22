import express from 'express';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';

import { context } from 'rest/middleware/context';
import { catchHandler } from 'app/rest/middleware/catch-handler';
import { loginHandler } from 'rest/controler/user/postLoginHandler';
import { apiLimiter } from 'rest/config/rateLimit';
import { cors } from 'rest/config/cors';

const app = express();

app.set('trust proxy', 'loopback');
app.all('*', cors);
app.all('*', apiLimiter);
app.use(bodyParser.json({ limit: '1mb' }));

app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'live' });
});

app.post('/v1/login', context, asyncHandler(catchHandler(loginHandler)));
export default app;
