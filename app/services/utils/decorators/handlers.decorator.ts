import { iRouter, Methods } from '@app/services/types/handler.interface';
import { MetadataKeys } from '../../types/metadata.keys';

/**
 * 
 * @param method is the method of the controller
 * define routers to metadata
 * @returns 
 */

const methodDecoratorFactory = (method: Methods) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;

      const routers: iRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
        : [];

      routers.push({
        method,
        path,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);