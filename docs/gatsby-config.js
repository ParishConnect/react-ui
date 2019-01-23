const Path = require('path')

module.exports = {
  plugins: [
    'gatsby-plugin-favicon',
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/Page.js')
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: Path.resolve(__dirname, '../dist/'),
        name: 'evergreen'
      }
    },
    // 'gatsby-transformer-react-docgen',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss'
  ],
  siteMetadata: {
    title: 'ParishKit documentation',
    description: 'ParishKit Design System by Segment'
  }
}
