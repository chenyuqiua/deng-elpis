module.exports = (app, router) => {
  const { projectController } = app.controller;

  router.get('/api/project/list', projectController.getList.bind(projectController));
};
