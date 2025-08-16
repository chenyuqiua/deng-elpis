const file = require('../util/file');

/**
 * extend 加载器
 * @param {Object} app 应用实例
 * 加载所有的extend, 可通过 'app.extend.{目录}.{文件名}' 访问
 * 目录和文件名会转换为大驼峰, 路径分隔符会转换为 '.',
 * 一级目录
 * 例如 'app/extend/aa-bb.js' 转换为 'app.extend.aaBb'
 */
module.exports = (app) => {
  const fileList = file.getFilePathList(app.businessPath, 'extend');

  fileList.forEach((filePath) => {
    const name = file.formatPathToName(filePath, 'extend');

    // 检查key是否已经存在
    for (const key in app) {
      if (key === name) {
        console.log(`[extend load error] ${key} is already in app`);
        return;
      }
    }

    app[name] = require(filePath)(app);
  });
};
