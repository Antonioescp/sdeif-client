const webpack = require('webpack');
const path = require('path');

const backendConfig = {
    target: 'electron-main',
    watch: true,
    entry: {
        main: './src/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /(\.tsx?)$/, use: 'ts-loader' },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
}

const frontendConfig = {
    target: 'electron-renderer',
    devtool: 'inline-source-map',
    watch: true,
    entry: {
        renderer: './src/renderer.tsx'
    },
    externals: {
        'react-native-sqlite-storage': 'react-native-sqlite-storage',
        typeorm: 'commonjs typeorm'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /(\.tsx?)$/, use: 'ts-loader' },
            { test: /(\.css)$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpe?g|svg|gif)$/, type: 'asset/inline' },
            { test: /\.html$/, type: 'asset/resource' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '...']
    }
}

module.exports = [backendConfig, frontendConfig]