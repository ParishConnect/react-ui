import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const focusState =
  '&[data-isselectable="true"]:focus, &[aria-expanded="true"][aria-haspopup="true"]'

export interface TableCellAppearance {
  focus: object
}

const createTableCellAppearance = (items: TableCellAppearance): object => {
  missingStateWarning({
    items,
    props: ['focus'],
    cb: (prop: string) => {
      console.error(
        `Themer.createTableCellAppearance() is missing a ${prop} item `,
        items
      )
    }
  })

  return {
    [focusState]: createAppearance(items.focus)
  }
}

export default createTableCellAppearance
