module.exports = (_baseConfig, _env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          plugins: ['lodash']
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
