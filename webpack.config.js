/**
 * This is a simple webpack configuration file for bundling up a UI library.
 * The general idea here is we separate our vendor and app bundles for caching purposes, i.e we may not want clients
 * having to reload dependencies every time. In addition to this we still want to bundle all of our dependencies up together
 * and scope them within the project. This allows us to isolate and control what dependencies we have, and allow us to use this
 * in legacy sites without conflicting with any existing JS.
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.ts',
        output: {
            filename: 'react-ui.js',
            path: __dirname + '/dist',
            library: 'ReactUI',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        devServer: { contentBase: __dirname + 'dist', port: 8081 },
        devtool: isProduction ? undefined : 'source-map',
        mode: argv.mode || 'development',
        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.json', '.scss', '.html' ]
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: 'ts-loader' },
                ...( isProduction ? [] : [ { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' } ] ),
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]_[local]_[hash:base64]'
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        filename: 'vendor.react-ui.js',
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new CopyWebpackPlugin(
                [
                    { from: '*.html', to: '', context: './src/' },
                    ...( isProduction ? [] : [ { from: '**/api/**/*.json', to: '', context: './src/' } ] ),
                ]
            ),
            new MiniCssExtractPlugin({
                filename: 'bundle.css',
                chunkFilename: '[name]_[id].sss'
            })
        ]
    }
};
