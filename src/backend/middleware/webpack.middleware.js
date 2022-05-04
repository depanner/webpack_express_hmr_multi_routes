const path = require('path')
const webpack = require('webpack')
const chokidar = require('chokidar')

const webpackConfig = require(path.resolve('webpack', 'webpack.dev.js'))
const compiler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {publicPath: webpackConfig.output.publicPath})
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000})
const htmlFiles = `${path.resolve('_build')}/*.html`
const watcher = chokidar.watch(htmlFiles)

watcher.on('ready', () =>
{
    console.debug('[DEBUG] watcher ready')
})

watcher.on('change', (path) => 
{
    console.debug(`[DEBUG] change detected on *** ${path} ***`)

    webpackHotMiddleware.publish({action: 'reload'})
})

module.exports = (app) =>
{
    app.use(webpackDevMiddleware)
    app.use(webpackHotMiddleware)
}