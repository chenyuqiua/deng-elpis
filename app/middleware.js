const koaNunjucks = require('koa-nunjucks-2');
const koaStatic = require('koa-static');
const path = require('path');

module.exports = (app) => {
  // 静态资源 指定入口为 /app/public
  app.use(koaStatic(path.resolve(app.baseDir, './app/public')));
  // 模板渲染引擎 指定入口为 /app/public
  app.use(
    koaNunjucks({
      ext: 'tpl',
      path: path.resolve(app.baseDir, './app/public'),
      nunjucksConfig: {
        noCache: true,
        trimBlocks: true,
      },
    })
  );
};
