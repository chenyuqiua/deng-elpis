module.exports = (app) => {
  return class PageViewController {
    async renderPage(ctx) {
      await ctx.render(`output/entry.${ctx.params.page}`, {
        name: app.config.name,
        port: app.config.port,
      });
    }
  };
};
