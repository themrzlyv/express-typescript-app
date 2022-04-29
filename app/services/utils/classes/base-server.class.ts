import express, { Application, Handler, RequestHandler, Router } from 'express';
import { iRouter } from '../../types/handler.interface';
import { MetadataKeys } from '../../types/metadata.keys';
import { ControllerInstance, iBootstrapParams } from '../../types/server.interface';
import { Type } from '../../types/type.interface';

/**
 * @description
 * This class is used to bootstrap the server.
 * It is used to create the express application and set the routers.
 * It also sets the error handler.
 * @class
 * iBootstrapParams interface is used to pass the parameters to the bootstrap method.
 * setRouters method gets all controlleres from imports and sets the routers.
 * controllerHandler handles controller routes and middleware.
 * @usage
 * Extend this class and call the bootstrap method.
 * use @Module decorator to import the modules.
 * Pass the mainRouterPath to the bootstrap method.
 */

export default class BaseServer {
  protected static readonly app: Application = express();
  protected static readonly router: Router = express.Router();
  protected static readonly port: number = Number(process.env.PORT) || 4000;
  protected static mainRouterPath: string;

  protected constructor() {}

  public static bootstrap(data: iBootstrapParams): void {}

  protected static setRouters(): void {
    const { imports } = Reflect.getMetadata(MetadataKeys.MODULE, this);
    for (const module of imports) {
      const { controllers } = Reflect.getMetadata(MetadataKeys.MODULE, module);
      for (const Controller of controllers) {
        const controllerInstance: ControllerInstance = new Controller();
        const controllerPath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, Controller);
        this.controllerHandler(Controller, controllerInstance);
        this.app.use(this.mainRouterPath + controllerPath, this.router);
      }
    }
  }

  protected static controllerHandler(
    Controller: Type<any>,
    controllerInstance: ControllerInstance,
  ): void {
    const controllerRoutes: iRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, Controller);
    const controllerMiddleware: RequestHandler[] = Reflect.getMetadata(
      MetadataKeys.MIDDLEWARE,
      Controller,
    );
    for (const route of controllerRoutes) {
      const { method, path, handlerName } = route;
      const handler: Handler = controllerInstance[handlerName as string];
      this.router[method](path, ...controllerMiddleware, handler);
    }
  }
}
