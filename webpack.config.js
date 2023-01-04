const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function (env, argV){
    const mode = argV.mode || 'development';
    let plugins;
    let params;

    if(mode === 'development'){
        plugins= [
            new CopyPlugin({
                patterns: ['./src/img/weather-logo.png', './src/img/weather-logo-min.png'],
            }),

            new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
        })];

        params = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'];
    } else {
        plugins= [
            new CopyPlugin({
            patterns: ['./src/img/weather-logo.png', './src/img/weather-logo-min.png'],
            }),
        
            new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            }), 

        new MiniCssExtractPlugin({
            filename: 'style.css',
        })];

        params = [
            MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader',
            ];
    }

    return {
        devServer:{
            port: 9000,
            hot: true,
            open: true,
        },

        mode: mode,
        entry: './src/js/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '',
            filename: 'bundle.js',
            clean: true,
        },

        plugins: plugins,

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.(scss|css)$/,
                    use: params,
                },
            ],
        }
    };
};