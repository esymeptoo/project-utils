const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.NODE_ENV

module.exports = {
  mode,
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  context: __dirname,
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'eslint-loader',
      //   },
      // },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')({
              browsers: [
                'Android > 4',
                'iOS > 8'
              ]
            })]
          }
        }, 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    inline: true,
    open: false,
    compress: true,
    port: 8080,
    hot: true,
  },
}
