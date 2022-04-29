import { Handler } from "express";

export interface iBootstrapParams {
  mainRouterPath: string;
}

export interface ControllerInstance {
    [handleName: string]: Handler;
}
