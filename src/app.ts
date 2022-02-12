import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { IRoute } from './interfaces/route.interface';

dotenv.config();

const { DATABASE_URL, PORT } = process.env;

export class App {
  public app: Application;

  constructor(routes: IRoute[]) {
    this.app = express();

    this.connectDB();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use('*', (req: Request, res: Response) => {
      return res.status(404).json({
        statusCode: 404,
        error: 'Invalid Route',
      });
    });
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private connectDB(): void {
    try {
      mongoose.connect(`${DATABASE_URL}`).then();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  listen(): void {
    const port = PORT || 4000;
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}
