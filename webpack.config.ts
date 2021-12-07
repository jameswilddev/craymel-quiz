import * as fs from "fs";
import * as path from "path";
import MiniCssExtractPlugin = require("mini-css-extract-plugin");
import FaviconsWebpackPlugin = require("favicons-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import WorkboxWebpackPlugin = require("workbox-webpack-plugin");

export default {
  entry: path.join(__dirname, `src`, `index.js`),
  output: {
    path: path.join(__dirname, `dist`),
    filename: `[fullhash].js`,
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, `css-loader`, `sass-loader`],
      },
      { test: /\.pug$/, loader: "pug-loader" },
    ],
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, `logo.svg`),
      prefix: ``,
      favicons: {
        appName: `Craymel Quiz`,
        appShortName: `Craymel Quiz`,
        appDescription: `Craymel Quiz`,
        developerName: `SUNRUSE`,
        developerURL: `https://www.sunruse.co.uk`,
        lang: `en-US`,
        background: `#422`,
        theme_color: `#422`,
        appleStatusBarStyle: `black-translucent`,
        display: `standalone`,
        orientation: `any`,
        scope: `/`,
        start_url: `/`,
        version: JSON.parse(
          fs.readFileSync(path.join(__dirname, `package.json`), `utf8`)
        ).version,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src`, `index.pug`),
      title: `Craymel Quiz`,
    }),
    new MiniCssExtractPlugin({
      filename: path.join(`[fullhash].css`),
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
