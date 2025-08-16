const path = require('path');
const glob = require('glob');
const { sep } = path;

module.exports = {
  getFileList: (app, folderName) => {
    const folderPath = path.resolve(app.businessPath, `.${sep}${folderName}`);
    return glob.sync(`${folderPath}${sep}**${sep}**.js`);
  },
};
