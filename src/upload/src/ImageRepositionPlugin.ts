const plugin = ({ addFilter, utils }) => {
  const { Type, isFile } = utils

  const updateCrop = (item, obj) =>
    item.setMetadata('crop', Object.assign({}, item.getMetadata('crop'), obj))

  addFilter(
    'DID_LOAD_ITEM',
    (item, { query }) =>
      new Promise((resolve, reject) => {
        const file = item.file

        if (!isFile(file)) {
          return resolve(item)
        }

        const crop = item.getMetadata('crop')

        item.setMetadata('crop', {
          ...crop,
          center: {
            ...crop.center,
            y: 0
          }
        })

        resolve(item)
      })
  )

  return {
    options: {
      // enable or disable image cropping
      allowImageResize: [true, Type.BOOLEAN]
    }
  }
}

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
if (isBrowser) {
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin })
  )
}

export default plugin
