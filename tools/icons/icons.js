const Icon = require('./icon')
const icons = require('./icons.json')

module.exports = Object.keys(icons)
  .map(key => new Icon(key, icons[key]))
  .reduce((object, icon) => {
    object[icon.name] = icon
    return object
  }, {})
