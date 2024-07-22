const path = require("path");
const { override, addWebpackModuleRule } = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DEV_MODE = process.env.NODE_ENV !== "production";

const overrideProcessEnv = (value) => (config) => {
  config.resolve.modules = [path.join(__dirname, "src")].concat(config.resolve.modules);
  return config;
};

const addMiniCssExtractPlugin = () => (config) => {
  if (DEV_MODE) return config;

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  );
  return config;
};

module.exports = override(
  addWebpackModuleRule({
    test: /\.module.less$/,
    include: path.resolve(__dirname, "src/components"),
    use: [
      DEV_MODE ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]__[local]__[hash:base64:5]"
          }
        }
      },
      {
        loader: "less-loader",
        options: { javascriptEnabled: true }
      }
    ]
  }),

  addWebpackModuleRule({
    test: /\.less$/,
    include: path.resolve(__dirname, "src/styles"),
    use: [
      DEV_MODE ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "less-loader",
        options: { javascriptEnabled: true }
      }
    ]
  }),

  addMiniCssExtractPlugin(),

  overrideProcessEnv({
    VERSION: JSON.stringify(require("./package.json").version)
  })
);
