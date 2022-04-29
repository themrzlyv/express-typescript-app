export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface iRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
}