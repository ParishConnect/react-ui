const path = require('path')
const webpack = require('webpack') // eslint-disable-line import/no-extraneous-dependencies
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.example/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      // See https://github.com/FormidableLabs/react-live/issues/5
      new webpack.IgnorePlugin(/^(xor|props)$/),
      new TSDocgenPlugin()
    ],
    resolve: {
      // Force Gatsby to look for dependencies within the local node_modules from docs.
      modules: [path.join(__dirname, 'node_modules')],
      alias: {
        '@hennessyevan/aluminum-ui': path.resolve(__dirname, '../dist/'),
        components: path.resolve(__dirname, './src/components')
      }
    }
  })
}
