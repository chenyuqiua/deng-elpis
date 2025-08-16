const file = require('../util/file');

/**
 * controller 加载器
 * @param {Object} app 应用实例
 * 加载所有的controller, 可通过 'app.controller.{目录}.{文件名}' 访问
 * 目录和文件名会转换为大驼峰, 路径分隔符会转换为 '.',
 * 多级目录
 * 例如 'app/controller/custom-folder/aa-bb.js' 转换为 'app.controller.customFolder.aaBb'
 */
module.exports = (app) => {
  // 获取到controller目录下的所有js文件, 并转换为对象挂载到app.controllers中
  const controller = file.getFileModuleTree({
    filePath: app.businessPath,
    folderName: 'controller',
    handlerModule: (module) => {
      const Controller = module(app);
      return new Controller(app);
    },
  });
  app.controller = controller;
};
