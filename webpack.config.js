const path = require('path')

const { VueLoaderPlugin, default: loader } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/main/main.ts',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss', 'css', 'vue'],
    alias: {
      '@': path.join(__dirname, 'src'),
      vue: '@vue/runtime-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: [
                './src/presentation/styles/colors.scss',
                './src/presentation/styles/global.scss',
              ],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    writeToDisk: true,
    liveReload: true,
    // hot: true,
    inline: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': 'http://localhost:5050/api/',
    }),
    new VueLoaderPlugin(),
  ],
}
