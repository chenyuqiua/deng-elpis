module.exports = (app) => {
  const BaseController = require('./base.controller')(app);
  return class ProjectController extends BaseController {
    async getList(ctx) {
      const projectList = await app.service.projectService.getList();
      this.success(ctx, { data: projectList, metadata: {} });
    }
  };
};
