module.exports = (app) => {
  const BaseService = require('./base-service')(app);
  return class ProjectService extends BaseService {
    async getList() {
      // 模拟数据
      return [
        {
          id: 1,
          name: 'project1',
        },
        {
          id: 2,
          name: 'project2',
        },
      ];
    }
  };
};
