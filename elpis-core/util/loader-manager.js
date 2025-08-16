const loaders = require('../loader');

module.exports = {
  /**
   * 初始化加载器
   * @param {Object} app 应用实例
   */
  init: (app) => {
    const { config, extend, middleware, router, routerSchema, service } = loaders;
    config(app);
    console.log('-- [start] load config done --');
    middleware(app);
    console.log('-- [start] load middleware done --');
    extend(app);
    console.log('-- [start] load extend done --');
    routerSchema(app);
    console.log('-- [start] load routerSchema done --');
    service(app);
    console.log('-- [start] load service done --');
    router(app);
    console.log('-- [start] load router done --');
  },
  loaders,
};
