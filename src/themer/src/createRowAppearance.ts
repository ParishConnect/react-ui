import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const hoverState = '&[data-isselectable="true"]:hover'
const focusState = '&[data-isselectable="true"]:focus, &[aria-selected="true"]'
const activeState = '&[aria-current="true"], &[data-isselectable="true"]:active'
const currentState = '&[aria-current="true"]'

const baseStyle = {
  '&[data-isselectable="true"]': {
    cursor: 'pointer'
  },
  outline: 'none'
}
export interface RowAppearance {
  base: object
  hover: object
  active: object
  focus: object
  current: object
}
const createRowAppearance = (items: RowAppearance): object => {
  missingStateWarning({
    items,
    props: ['base', 'hover', 'active', 'focus', 'current'],
    cb: (prop: string) => {
      console.error(
        `Themer.createRowAppearance() is missing a ${prop} item `,
        items
      )
    }
  })

  return {
    ...baseStyle,
    ...createAppearance(items.base),
    [hoverState]: createAppearance(items.hover),
    [focusState]: createAppearance(items.focus),
    [activeState]: createAppearance(items.active),
    [currentState]: createAppearance(items.current)
  }
}

export default createRowAppearance
