const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.[chunkhash].js',
        chunkFilename: `js/[name].[chunkhash].js`,
        publicPath: process.env.ENV === 'development' ? '/' : './'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'reactVendor',
                    priority: 10
                },
                pfVendor: {
                    test: /[\\/]node_modules[\\/](@patternfly)[\\/]/,
                    name: 'pfVendor',
                    priority: 10
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 9
                }
            }
        }
    },
    devServer: {
        https: false,
        allowedHosts: 'all',
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        client: {
            overlay: false
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|jpg|png|eot|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'public/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new EnvironmentPlugin({ ENV: '' }),
        ...(process.env.ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : [])
    ]
};
