const loaders = require('../loader');

module.exports = {
  /**
   * 初始化加载器
   * @param {Object} app 应用实例
   */
  init: (app) => {
    const { config, extend, middleware, router, routerSchema, service, controller } = loaders;
    middleware(app);
    console.log('-- [start] load middleware done --', app.middlewares);
    routerSchema(app);
    console.log('-- [start] load routerSchema done --', app.routerSchema);
    controller(app);
    console.log('-- [start] load controller done --', app.controller);
    service(app);
    console.log('-- [start] load service done --', app.service);
    config(app);
    console.log('-- [start] load config done --');
    extend(app);
    console.log('-- [start] load extend done --');
    router(app);
    console.log('-- [start] load router done --');
  },
  loaders,
};
