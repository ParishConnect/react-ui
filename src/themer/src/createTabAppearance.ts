import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const hoverState = '&:hover'
const selectedState =
  '&[aria-current="page"], &[aria-selected="true"], &:active'
const currentState = '&[aria-current="page"], &[aria-selected="true"]'
const focusState = '&:focus'

const baseStyle = {
  cursor: 'pointer',
  outline: 'none'
}

export interface TabAppearance {
  base: object
  hover: object
  active: object
  focus: object
  current: object
}

const createTabAppearance = (items: TabAppearance): object => {
  missingStateWarning({
    items,
    props: ['base', 'hover', 'active', 'focus', 'current'],
    cb: (prop: string) => {
      console.error(
        `Themer.createTabAppearance() is missing a ${prop} item `,
        items
      )
    }
  })

  return {
    ...baseStyle,
    ...createAppearance(items.base),
    [hoverState]: createAppearance(items.hover),
    [focusState]: createAppearance(items.focus),
    [selectedState]: createAppearance(items.active),
    [currentState]: {
      cursor: 'default',
      ...createAppearance(items.current)
    }
  }
}

export default createTabAppearance
