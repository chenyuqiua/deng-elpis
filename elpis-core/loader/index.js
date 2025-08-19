const config = require('./config');
const controller = require('./controller');
const extend = require('./extend');
const middleware = require('./middleware');
const routerSchema = require('./router-schema');
const router = require('./router');
const service = require('./service');

module.exports = {
  config,
  controller,
  extend,
  middleware,
  router,
  routerSchema,
  service,
};
