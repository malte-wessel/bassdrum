const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        alias: {
            bassdrum: path.resolve(__dirname, '../../build'),
        },
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './public',
    },
};
