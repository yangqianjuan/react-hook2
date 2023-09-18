const merge = require('webpack-merge');
const common = require('../../webpack.common');
const path = require('path');
module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'reactHooks.js',
    library: 'reactHook',
    path: path.resolve(__dirname, './dist'),
  },
});
