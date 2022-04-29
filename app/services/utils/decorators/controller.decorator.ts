import { MetadataKeys } from '../../types/metadata.keys';

/**
 * 
 * @param basePath is the base path of the controller
 * @returns 
 */

const Controller = (basePath: string): ClassDecorator => {
  return (target: Object) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
}

export default Controller;