import isDev from './isDev'

const whitelist = [
  'background',
  'backgroundColor',
  'backgroundImage',
  'backdropFilter',

  'borderBottom',
  'borderRadius',

  'transition',
  'boxShadow',
  'opacity',

  'color',
  'fill',
  'textShadow',

  'outline',
  // Not sure if cursor should be configurable
  'cursor',
  'labelColor'
]

function createAppearance(obj = {}) {
  const result = {}
  const keys = Object.keys(obj)

  keys.forEach(key => {
    if (whitelist.includes(key)) {
      if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        result[key] = obj[key]
      } else if (isDev) {
        console.error(
          `createAppearance() only accepts strings as properties, key '${key}' with value '${obj[key]}' is not a string`
        )
      }
    } else if (isDev) {
      console.error(
        `createAppearance() only accepts whitelisted properties, key '${key}' is not whitelisted in whitelist: `,
        whitelist
      )
    }
  })

  return result
}

export default createAppearance
