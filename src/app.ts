import cors from 'cors';
import express, { type Response } from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import helmet from 'helmet';
import morgan from 'morgan';
import nocache from 'nocache';

import appConfig from './config/app.config';
import expressJSDocSwaggerConfig from './config/express-jsdoc-swagger.config';
import environment from './lib/environment';

import prismaClient from '@/lib/prisma';
import errorHandler from '@/middlewares/error-handler';
import routes from '@/modules/index';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.disableSettings();
    this.setRoutes();
    this.setErrorHandler();
    this.initializeDocs();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static('public'));
  }

  private disableSettings(): void {
    this.express.disable('x-powered-by');
  }

  private setRoutes(): void {
    const {
      api: { version },
    } = appConfig;
    const { env } = environment;
    this.express.use('/', (_, res: Response) => {
      res.status(200).json({ message: 'Hello world' });
    });
    this.express.use(`/api/${version}/${env}`, routes);
  }

  private setErrorHandler(): void {
    this.express.use(errorHandler);
  }

  private initializeDocs(): void {
    expressJSDocSwagger(this.express)(expressJSDocSwaggerConfig);
  }

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect();
  }
}

export default App;
