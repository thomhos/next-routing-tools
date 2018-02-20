const next = require("next");
const express = require("express");
const { handleExpress } = require("../dist");

const routes = require("./routes");

const server = express();
const app = next({ dev: true, dir: __dirname });
const handler = handleExpress(routes, app);

app.prepare().then(() => {
  server.get("*", handler);
  server.listen(3000, () => {
    console.log("Running on http://localhost:3000");
  });
});
