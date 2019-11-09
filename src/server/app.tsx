import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import App from "../ServerApp";
import { initStore } from "../store";

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
        index: false,
        publicPath: "/"
      })
    );
  } else {
    staticPath = path.resolve(__dirname, "../client/public/");
  }

  app.use("/favicon.ico", (_req, res) => res.status(200).send());
  app.use("/public", express.static(staticPath));

  app.get("/*", (req, res) => {
    const indexFile = path.resolve(__dirname, "../index.html");

    fs.readFile(indexFile, "utf8", (err, htmlData) => {
      if (err) {
        return res.status(404).end();
      }
      const { store } = initStore(req);
      const jsx = <App req={req} store={store} />;
      const reactDom = renderToString(jsx);
      const helmet = Helmet.renderStatic();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        injectHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          body: reactDom,
          scripts: [
            '<script src="./public/bundle.js"></script>'
          ],
          styles: [
            '<link href="./public/main.css" rel="stylesheet">'
          ],
          state: JSON.stringify(store.getState()).replace(/</g, "\\u003c")
        })
      );
    });
  });
  return app;
}

const injectHTML = (
  data,
  { html, title, meta, body, scripts, styles, state }
) => {
  data = data.replace("<html>", `<html ${html}>`);
  data = data.replace(/<title>.*?<\/title>/g, title);
  data = data.replace("</head>", `${meta}${styles.join("")}</head>`);
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.REDUX_DATA = ${state}</script>${scripts.join(
      ""
    )}`
  );

  return data;
};