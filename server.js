var path = require("path");
var express = require("express");
var morgan = require("morgan");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");


var app = express();
var compiler = webpack(webpackConfig);


app.use(morgan("dev"));


app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: false,
	publicPath: webpackConfig.output.publicPath
}));


app.use(require("webpack-hot-middleware")(compiler, {
	log: console.log
}));


app.use(express.static(webpackConfig.output.path));


app.get("/", function(req, res) {
	res.sendFile(path.join(webpackConfig.output.path, "index.html"));
});


app.listen(8080, "0.0.0.0", function(err) {
	if (err) {
		console.error(err);
		return;
	}

	console.log("Listening at http://0.0.0.0:8080");
});
