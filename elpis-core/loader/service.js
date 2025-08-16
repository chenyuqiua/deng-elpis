const file = require('../util/file');

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
