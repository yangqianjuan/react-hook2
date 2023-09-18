const merge = require('webpack-merge');
const common = require('../../webpack.common');
const path = require('path');
module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'demoHooks.js',
    library: 'demoHook',
    path: path.resolve(__dirname, './dist'),
  },
});
