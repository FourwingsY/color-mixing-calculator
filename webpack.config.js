const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname + "/public",
    filename: "app.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract([
        {loader: "css", query: {sourceMap: true}},
        {loader: "postcss"}
      ])},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/, include: /app/},
      {test: /\.png$/, loader: 'file?name=[name].[ext]'}
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    })
  ],
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-cssnext")(),
      require("postcss-nesting")({})
    ]
  }
}
