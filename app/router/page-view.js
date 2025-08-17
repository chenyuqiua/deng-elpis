module.exports = (app, router) => {
  const { pageViewController } = app.controller;

  router.get('/view/:page', pageViewController.renderPage.bind(pageViewController));
};
