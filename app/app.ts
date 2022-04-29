import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { prismaConnect } from './config/config';
import errorHandler from './middlewares/errorHandler.middleware';
import Module from './services/utils/decorators/modules.decorator';
import TodoModule from './todo/todo.module';
import { iBootstrapParams } from './services/types/server.interface';
import BaseServer from './services/utils/classes/base-server.class';
import morgan from 'morgan';
import path from 'path';

dotenv.config();

// prisma connection
prismaConnect()
  .then(() => console.log('Prisma connection is successful'))
  .catch((error) => console.log(error));


@Module({
  imports: [TodoModule],
})
class Server extends BaseServer {
  private constructor() {
    super();
  }
  public static bootstrap({ mainRouterPath }: iBootstrapParams) {
    this.mainRouterPath = mainRouterPath;
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setRouters();
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('tiny'));
      console.log('Morgan logger is activated');
    }
    this.app.use(errorHandler);
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(__dirname, '../client/build')));
      this.app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
      });
    }
    this.app.listen(this.port, () => console.log(`Server up and running on port ${this.port}`));
  }
}

Server.bootstrap({ mainRouterPath: '/api' });
