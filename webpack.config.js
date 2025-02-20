const webpack = require("@nativescript/webpack");

module.exports = (env) => {
module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};
