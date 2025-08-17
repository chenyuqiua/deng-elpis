module.exports = {
  '/api/project/list': {
    get: {
      query: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
          },
        },
        required: ['project_id'],
      },
    },
  },
};
