module.exports = (app) => {
  return class ProjectService {
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
