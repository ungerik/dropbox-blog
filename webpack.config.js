/* global process, __dirname, module */
var path = require("path");
var webpack = require("webpack");


function makeStandardConfig(projectDir, appEntry, appOutput) {
	var appOutput = appOutput || "app.js";
	// var outputPath = process.env.NODE_ENV === "production" ? "./dist" : "./build";
	var outputPath = process.env.NODE_ENV === "production" ? path.join(__dirname, "dist") : path.join(__dirname, "build");
	console.log("Webpack", path.join(projectDir, outputPath));

	return {
		addLib: function(name, filename, parse) {
			this.entry.libs.push(name);
			if (filename) {
				filename = path.join(projectDir, filename);
				this.resolve.alias[name] = filename;
				if (!parse) {
					this.module.noParse.push(new RegExp("^" + filename + "$"));
				}
			}
		},

		// devtool: "eval",
		devtool: "inline-source-map",

		entry: {
			app: [appEntry],
			libs: [] // will be filled by addLib()
		},

		output: {
			path: outputPath,
			publicPath: "/",
			filename: appOutput
		},

		module: {
			loaders: [
				{test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel"},
				{test: /\.jsx$/, loader: "babel"},
				{test: /\.css$/, loader: "style!css"},
				{test: /\.(woff|woff2)$/, loader: "url?&mimetype=application/font-woff"},
				{test: /glyphicons(.*)\.(ttf|eot|svg)$/, loader: "file?name=fonts/[name].[ext]"}
			],
			noParse: [] // will be filled by addLib()
		},

		resolve: {
			extensions: ["", ".js", ".jsx"],
			modulesDirectories: ["node_modules", "bower_components"],
			alias: {} // will be filled by addLib()
		},

		plugins: [
			new webpack.optimize.CommonsChunkPlugin("libs", "libs.js"),
			new webpack.optimize.OccurenceOrderPlugin()
		]
	};
}


function makeStandardHotConfig(projectDir, appEntry, appOutput) {
	var config = makeStandardConfig(projectDir, appEntry, appOutput);
	// var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true&timeout=2000";
	var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
	config.entry.app.push(hotMiddlewareScript);
	config.entry.libs.push(hotMiddlewareScript);
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	config.plugins.push(new webpack.NoErrorsPlugin());
	return config;
}


// var config = makeStandardConfig(__dirname, "./source/main.js");
var config = makeStandardHotConfig(__dirname, "./source/main.js");

// Polyfills:
config.addLib("console-polyfill", "bower_components/console-polyfill/index.js");
config.addLib("es5-shim", "bower_components/es5-shim/es5-shim.min.js");
config.addLib("es5-sham", "bower_components/es5-shim/es5-sham.min.js");
config.addLib("html5shiv-printshiv", "bower_components/html5shiv/dist/html5shiv-printshiv.min.js");
config.addLib("browser-polyfill", "node_modules/babel-core/browser-polyfill.min.js");
config.addLib("fetch", "bower_components/fetch/fetch.js");

// CSS:
config.addLib("bootstrap.css", "bower_components/bootstrap/dist/css/bootstrap.min.css");

// Required libs:
config.addLib("react");
config.addLib("react-bootstrap");
config.addLib("react-router");
config.addLib("react-router-bootstrap");
config.addLib("marked");


module.exports = config;
