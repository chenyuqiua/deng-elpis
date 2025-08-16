const file = require('../util/file');

module.exports = (app) => {
  const service = file.getFileModuleTree({
    businessPath: app.businessPath,
    folderName: 'service',
    handlerModule: (module) => {
      const Service = module(app);
      return new Service(app);
    },
  });
  app.service = service;
};
