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
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    },
    devServer: {
        contentBase: './public',
    },
};
