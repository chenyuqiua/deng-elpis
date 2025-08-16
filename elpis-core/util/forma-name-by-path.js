const { sep } = require('path');

/**
 * 将文件路径转换为大驼峰名称
 * @param {string} file 文件路径
 * 例如 'custom-folder/aa-bb.js' 转换为 'customFolder.aaBb'
 */
module.exports = (file) => {
  let name = file;
  const subIndex = name.lastIndexOf(`middleware${sep}`);
  name = name.substring(subIndex, name.lastIndexOf('.'));
  name = name.replace(/[_-][a-z]/g, (match) => match.substring(1).toUpperCase());
  return name;
};
