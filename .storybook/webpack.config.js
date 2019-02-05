const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')

module.exports = (_baseConfig, _env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('cache-loader')
      },
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: ['lodash']
        }
      }
    ]
  })
  config.plugins.push(
    new MomentTimezoneDataPlugin({
      startYear: 2017,
      endYear: new Date().getFullYear() + 2,
      matchZones: /(America|Canada)/
    })
  )
  config.resolve.extensions.push('.ts', '.tsx', '.json')
  return config
}
