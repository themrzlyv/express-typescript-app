import { Type } from '@app/services/types/type.interface';
import { RequestHandler } from 'express';
import { MetadataKeys } from '../../types/metadata.keys';

/**
 * 
 * @param middlewares is the middlewares of the methods of controller
 * pass the middlewares with array of RequestHandler or Type<any>
 * it will be used to define the middlewares of the methods of controller
 * @returns 
 */

const Middleware = (middlewares: RequestHandler[] | Type<any>[]): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    const controllerClass = target.constructor;
    Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, middlewares, controllerClass);
  };
};

export default Middleware;