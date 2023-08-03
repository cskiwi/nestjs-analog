import { INestApplication } from '@nestjs/common';
import { RequestAdapter } from 'vite-plugin-node';

let prevApp: INestApplication;

export const nestRequestAdapter: RequestAdapter<INestApplication> = async ({
  app,
  req,
  res,
  next,
}) => {
  if (req.url?.startsWith('/api')) {
    // Call the nest application
    // @ts-expect-error nest app typing error
    if (!app.isInitialized) {
      if (prevApp) await prevApp.close();

      await app.init();
      prevApp = app;
    }

    const instance = app.getHttpAdapter().getInstance();

    if (typeof instance === 'function') {
      instance(req, res);
    } else {
      const fastifyApp = await instance.ready();
      fastifyApp.routing(req, res);
    }
  } else {
    next();
  }
};
