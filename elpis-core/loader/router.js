const path = require('path');
const file = require('../util/file');
const KoaRouter = require('koa-router');

/**
 * router 加载器
 * @param {Object} app 应用实例
 * 解析app/router/ 下面所有js文件, 加载到KoaRouter中
 */
module.exports = (app) => {
  const filePathList = file.getFilePathList(app.businessPath, 'router');
  const router = new KoaRouter();

  // 对所有路由进行注册, 准确说是将router实例回调出去, 由外部进行注册
  filePathList.forEach((filePath) => {
    require(path.resolve(filePath))(app, router);
  });

  // 路由兜底
  router.get('*', async (ctx) => {
    ctx.status = 302;
    ctx.redirect('/');
  });

  // 注册路由到app实例
  app.use(router.routes());
  app.use(router.allowedMethods());
};
