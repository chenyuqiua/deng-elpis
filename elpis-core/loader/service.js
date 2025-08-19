const file = require('../util/file');

/**
 * service 加载器
 * @param {Object} app 应用实例
 * 加载所有的service, 可通过 'app.service.{目录}.{文件名}' 访问
 * 目录和文件名会转换为大驼峰, 路径分隔符会转换为 '.',
 * 多级目录
 * 例如 'app/service/custom-folder/aa-bb.js' 转换为 'app.service.customFolder.aaBb'
 */
module.exports = (app) => {
  const service = file.getFileModuleTree({
    filePath: app.businessPath,
    folderName: 'service',
    handlerModule: (module) => {
      const Service = module(app);
      return new Service(app);
    },
  });
  app.service = service;
};
