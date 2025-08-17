module.exports = (app) => {
  return class ProjectController {
    async getList(ctx) {
      const projectList = await app.service.projectService.getList();
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: projectList,
        metadata: {},
      };
    }
  };
};
