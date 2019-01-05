const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/images", { target: "http://localhost:5000" }));

  app.use(proxy("/readdir", { target: "http://localhost:5000" }));
};
