import { Type } from "./type.interface";

export interface iModuleParams {
  imports?: Type<any>[];
  controllers?: Type<any>[];
}
