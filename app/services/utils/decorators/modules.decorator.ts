import { iModuleParams } from '@app/services/types/module.interface';
import { MetadataKeys } from '../../types/metadata.keys';

/**
 * 
 * @param module is the object
 * it has imports and controllers inside the module decorator
 * pass each module to main server class with imports
 * pass each controller to the every module with controllers
 * @returns 
 */

const Module = (module: iModuleParams): ClassDecorator => {
  return (target: Object) => {
    Reflect.defineMetadata(MetadataKeys.MODULE, module, target);
  };
};

export default Module;
