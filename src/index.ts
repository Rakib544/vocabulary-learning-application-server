import { config as configDotenv } from 'dotenv';

import appConfig from './config/app.config';
import server from './server';
import { printAppInfo } from './utils/print-app-info';

import environment from '@/lib/environment';
import prismaClient from '@/lib/prisma';

configDotenv();

server.listen(process.env.PORT, () => {
  const { port, env, appUrl: _appUrl } = environment;
  const {
    api: { basePath, version },
  } = appConfig;
  const appUrl = `${_appUrl}:${port}`;
  const apiUrl = `${appUrl}/${basePath}/${version}/${env}`;
  printAppInfo(port, env, appUrl, apiUrl);
});

process.on('SIGINT', () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  prismaClient.$disconnect();
  console.log('Prisma Disconnected.');
  process.exit(0);
});
