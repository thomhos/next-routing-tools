const { route } = require("../dist");

module.exports = {
  index: route("/"),
  blog: route("/blog"),
  blogSingle: route("/blog/:slug", "/blog-single")
};
