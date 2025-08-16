const file = require('../util/file');

/**
 * 中间件加载器
 * @param {Object} app 应用实例
 * 加载所有的中间件, 可通过 'app.middleware.{目录}.{文件名}' 访问
 * 目录和文件名会转换为大驼峰, 路径分隔符会转换为 '.',
 * 例如 'custom-folder/aa-bb.js' 转换为 'customFolder.aaBb'
 */
module.exports = (app) => {
  // 获取到middleware目录下的所有js文件, 并转换为对象挂载到app.middlewares中
  const middlewares = file.getFileModuleTree({
    filePath: app.businessPath,
    folderName: 'middleware',
    handlerModule: (module) => module(app),
  });
  app.middlewares = middlewares;
};
