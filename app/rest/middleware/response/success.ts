import express from 'express';

export const responseSuccess = (req: express.Request, res: express.Response, data = {}, isCreated = false) => {
  const requestUrl = req.url.toString();

  res.locals.ctx.logger
    .child({
      url: requestUrl,
      body: requestUrl.indexOf('/login') < 0 ? req.body : null,
      status: isCreated ? 201 : 200,
      level: 'info'
    })
    .info('SuccessExit');

  isCreated ? res.sendStatus(201) : res.send(data);
};
