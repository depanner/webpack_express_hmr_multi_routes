const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',

        entry:
        {
            index:
            [
                path.resolve('src', 'devScripts', 'client.js')
            ],
            services:
            [
                path.resolve('src', 'devScripts', 'client.js')
            ]
        },

        devtool: 'inline-source-map',

        plugins:
        [           
            new webpack.HotModuleReplacementPlugin()
        ],

        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true},
                        }
                    ],
                }
            ]
        }
    }
)