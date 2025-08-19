const loaders = require('../loader');
const { sep } = require('path');

module.exports = {
  /**
   * 初始化加载器, 加载所有的loader, 并挂载到app上
   * @param {Object} app 应用实例
   */
  init: (app) => {
    const { config, extend, middleware, router, routerSchema, service, controller } = loaders;
    middleware(app);
    console.log('[-- start --] load middleware done', app.middlewares);

    routerSchema(app);
    console.log('[-- start --] load routerSchema done', app.routerSchema);

    controller(app);
    console.log('[-- start --] load controller done', app.controller);

    service(app);
    console.log('[-- start --] load service done', app.service);

    config(app);
    console.log('[-- start --] load config done', app.config);

    extend(app);
    console.log('[-- start --] load extend done', app);

    // 注册全局中间件
    try {
      require(`${app.businessPath}${sep}middleware.js`)(app);
      console.log('[-- start --] load global middleware done');
    } catch (error) {
      console.error(`[-- exception --] there is no middleware file: ${error}`);
    }

    router(app);
    console.log('[-- start --] load router done', app);
  },
  loaders,
};
