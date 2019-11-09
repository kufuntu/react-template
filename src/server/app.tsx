import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../components/App";

const isDev = process.env.NODE_ENV !== "production";

export function createApp() {
  const app = express();
  
  let staticPath;
  if (isDev) {
    staticPath = path.resolve(__dirname, "../../dist/client/public/");
    const webpack = require("webpack");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const config = require("../../webpack.config");
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/'
      })
    );
  } else {
    staticPath = path.resolve(__dirname, "../client/public/");
  }

  app.use("/public", express.static(staticPath));

  app.get("/*", (_req, res) => {
    const jsx = <App />;
    const reactDom = renderToString(jsx);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(reactDom));
  });
  return app;
}

function htmlTemplate(reactDom: string) {
  const style = isDev ? "" : '<link href="./public/main.css" rel="stylesheet">';
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>React SSR</title>
    ${style}
</head>

<body>
    <div id="root">${reactDom}</div>
    <script src="./public/bundle.js"></script>
</body>
</html>`;
}
