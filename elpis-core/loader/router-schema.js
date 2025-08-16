const file = require('../util/file');

/**
 * router-schema 加载器schema
 * @param {Object} app 应用实例
 *
 * 一级目录
 * 加载app/router-schema/**.js
 * 输出
 * app.routerSchema = {
 *  '{api1}': {jsonSchema},
 *  '{api2}': {jsonSchema},
 *  ...
 * }
 */
module.exports = (app) => {
  const fileList = file.getFilePathList(app.businessPath, 'router-schema');

  let routerSchema = {};
  fileList.forEach((file) => {
    Object.assign(routerSchema, require(file));
  });
  app.routerSchema = routerSchema;
};
