const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = (env) => ({
    entry: './src/script.js',
    output: {
        filename: 'main.[contenthash].js',
        publicPath: env.prod ? './' : '/',
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'asset/',
                    publicPath: '/',
                },
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                        ],
                    },
                },
            },
        ],
    },
    experiments: {
        topLevelAwait: false,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            png: {
                                lossless: true,
                            },
                        },
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Крипто-банк',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
});
