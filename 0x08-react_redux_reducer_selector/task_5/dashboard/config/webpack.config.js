const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        clean: true,
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/ ,
                exclude: /node_modules/,
                use: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'inline-source-map'
};
