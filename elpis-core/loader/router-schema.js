const path = require('path');
const glob = require('glob');
const formaNameByPath = require('../util/forma-name-by-path');
const file = require('../util/file');
const { sep } = path;

/**
 * router-schema 加载器schema
 * @param {Object} app 应用实例
 *
 * 加载app/router-schema/**.js, 这里都是一级的
 * 输出
 * app.routerSchema = {
 *  '{api1}': {jsonSchema},
 *  '{api2}': {jsonSchema},
 *  ...
 * }
 */
module.exports = (app) => {
  const fileList = file.getFileList(app, 'router-schema');

  let routerSchema = {};
  fileList.forEach((file) => {
    Object.assign(routerSchema, require(file));
  });
  app.routerSchema = routerSchema;
};
