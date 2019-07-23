const plugin = ({ addFilter, utils }) => {
  const { Type } = utils

  let cropCenterY: number

  function mouseMoveWhilstDown(
    target: HTMLElement | null,
    whileMove: EventListenerOrEventListenerObject
  ) {
    var endMove = function() {
      window.removeEventListener('mousemove', whileMove)
      window.removeEventListener('mouseup', endMove)
    }

    if (target) {
      target.addEventListener('mousedown', function(event: MouseEvent) {
        event.stopPropagation() // remove if you do want it to propagate ..
        window.addEventListener('mousemove', whileMove)
        window.addEventListener('mouseup', endMove)
      })
    }
  }

  const moveImage = (e: MouseEvent, item: any) => {
    // Only left mouse button drag
    const initCrop = item.getMetadata('crop')

    const { x, y } = initCrop.center

    cropCenterY = y + -e.movementY / 900

    if (cropCenterY <= 0.25) cropCenterY = 0.25
    if (cropCenterY >= 0.75) cropCenterY = 0.75

    window.requestAnimationFrame(() => {
      item.setImageCropCenter({ x, y: cropCenterY })
    })
  }

  addFilter(
    'DID_CREATE_ITEM',
    (item: any) =>
      new Promise((resolve, reject) => {
        mouseMoveWhilstDown(
          document.querySelector('.filepond--wrapper'),
          (e: MouseEvent) => moveImage(e, item)
        )

        resolve(item)
      })
  )

  return {
    options: {
      allowImageReposition: [true, Type.BOOLEAN]
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
