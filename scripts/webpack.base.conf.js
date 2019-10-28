const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, '../', dir)
}

module.exports = {
  entry: {
    logic: resolve('packages/lone-logic/index.js'),
    ui: resolve('packages/lone-ui/index.js'),
    page: resolve('packages/lone-page/index.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'Lone.[name].js',
    library: ['Lone', '[name]'],
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // "presets": ["@babel/preset-env"],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }]
          ]
        }
      },
      {
        test: /\.js$/,
        loader: resolve('scripts/replace-loader.js'),
        exclude: /node_modules/,
        options: {
          __PAGEJS__: '"../../dist/lone.page.js"'
        }
      }
    ]
  }
}
