const path = require('path');
const glob = require('glob');
const { sep } = path;

/**
 * 获取文件夹下的所有文件路径列表
 * @param {string} filePath 文件路径
 * @param {string} folderName 文件夹名称, 例如 'middleware', 'controller'
 * @returns {string[]} 文件路径列表
 */
const getFilePathList = (filePath, folderName) => {
  const folderPath = path.resolve(filePath, `.${sep}${folderName}`);
  return glob.sync(`${folderPath}${sep}**${sep}**.js`);
};

/**
 * 将文件路径转换为大驼峰名称
 * @param {string} filePath 文件路径
 * @param {string} folderName 文件夹名称, 例如 'middleware', 'controller'
 * 例如 'custom-folder/aa-bb.js' 转换为 'customFolder.aaBb'
 */
const formatPathToName = (filePath, folderName) => {
  let name = filePath;
  const subIndex = name.lastIndexOf(`${folderName}${sep}`);
  name = name.substring(subIndex, name.lastIndexOf('.'));
  name = name.replace(/[_-][a-z]/g, (match) => match.substring(1).toUpperCase());
  return name;
};

/**
 * 将文件路径列表转换为一个对象
 * @param {Object} params 参数
 * @param {string} params.filePath 文件路径
 * @param {string} params.folderName 文件夹名称, 例如 'middleware', 'controller'
 * @param {Function} params.handlerModule 处理模块的函数, 如何处理由外部控制, 例如 (module) => module(app)
 * @returns {Object} 转换后的对象
 *
 * 将文件路径列表转换为一个对象
 * 例如有'app/{folderName}/a.js', 'app/{folderName}/b.js', 'app/{folderName}/c/d.js', 'app/{folderName}/c/e.js'
 * 转换为
 * {
 *  a: require('app/{folderName}/a.js')(app),
 *  b: require('app/{folderName}/b.js')(app),
 *  c: {
 *    d: require('app/{folderName}/c/d.js')(app),
 *    e: require('app/{folderName}/c/e.js')(app)
 *  }
 * }
 */
const getFileModuleTree = (params) => {
  const { filePath, folderName, handlerModule } = params;
  // 获取到文件夹下的所有文件路径列表
  const filePathList = getFilePathList(filePath, folderName);

  // 遍历所有文件, 转换为对象
  const ansObj = {};
  let tempObj = ansObj;
  filePathList.forEach((file) => {
    const name = formatPathToName(file, folderName);
    const names = name.split(sep);
    names.forEach((n, index) => {
      if (index === 0 && index !== names.length - 1) return;

      if (index === names.length - 1) {
        const module = require(file);
        tempObj[n] = handlerModule ? handlerModule(module) : module;
      } else {
        tempObj[n] = tempObj[n] || {};
        tempObj = tempObj[n];
      }
    });
  });
  return ansObj;
};

module.exports = {
  getFilePathList,
  getFileModuleTree,
  formatPathToName,
};
