const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config =  require('./webpack.config')(process.env);

const compiler = webpack(config);
const app = express();

const devMiddleware = webpackDevMiddleware(compiler, {
 publicPath: config.output.publicPath,
 historyApiFallback: true,
});

app.use(webpackHotMiddleware(compiler));
app.use(devMiddleware);


app.get('*', (req, res) => {
 // Here is it! Get the index.html from the fileSystem
 const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/../index.html`);

 res.send(htmlBuffer.toString())
});

app.listen(8080, 'localhost');
