module.exports = (app, router) => {
  const { pageView: viewController } = app.controller;

  router.get('/view/:page', viewController.renderPage.bind(viewController));
};
