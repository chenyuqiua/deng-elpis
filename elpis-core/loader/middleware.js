const path = require('path');
const glob = require('glob');
const formaNameByPath = require('../util/forma-name-by-path');
const { sep } = path;

/**
 * 中间件加载器
 * @param {Object} app 应用实例
 * 加载所有的中间件, 可通过 'app.middleware.{目录}.{文件名}' 访问
 * 目录和文件名会转换为大驼峰, 路径分隔符会转换为 '.',
 * 例如 'custom-folder/aa-bb.js' 转换为 'customFolder.aaBb'
 */
module.exports = (app) => {
  // 获取到middleware目录下的所有js文件
  const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`);
  const fileList = glob.sync(`${middlewarePath}${sep}**${sep}**.js`);

  // 遍历所有文件, 把内容加载到内存app.middleware中
  const middlewares = {};
  let temp = middlewares;
  fileList.forEach((file) => {
    const name = formaNameByPath(file);
    const names = name.split(sep);
    names.forEach((n, index) => {
      if (index === 0 && index !== names.length - 1) return;

      if (index === names.length - 1) {
        temp[n] = require(file)(app);
      } else {
        temp[n] = temp[n] || {};
        temp = temp[n];
      }
    });
  });
  app.middlewares = middlewares;
};
