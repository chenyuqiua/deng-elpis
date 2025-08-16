const Koa = require('koa');
const path = require('path');
const env = require('./env');
const { sep } = path; // 兼容不同操作系统的路径分隔符

/**
 * @description 启动方法
 * @param {*} options 应用配置项
 */
const start = (options = {}) => {
  const app = new Koa();

  app.options = options;

  // 设置基础路径和业务路径
  app.baseDir = process.cwd();
  app.businessPath = path.resolve(app.baseDir, `.${sep}app`);

  app.env = env();

  try {
    const port = process.env.PORT || 8080;
    const host = process.env.IP || '0.0.0.0';
    app.listen(port, host);
    console.log(`Server is running on http://${host}:${port}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  start,
};
