import isDev from './isDev'
import hasOwnProperty from './hasOwnProperty'

export interface MissingStateWarningArgs {
  items: object
  props: string[]
  cb: Function
}

function missingStateWarning({
  items = {},
  props,
  cb
}: MissingStateWarningArgs) {
  if (!isDev) {
    return
  }
  props.forEach((prop: string) => {
    if (!hasOwnProperty(items, prop)) {
      cb(prop)
    }
  })
}

export default missingStateWarning
