import missingStateWarning from './missingStateWarning'
import createAppearance from './createAppearance'

const hoverState = '&:hover'
const activeState = '&:active'
const focusState = '&:focus'

export interface LinkAppearance {
  base: object
  hover: object
  active: object
  focus: object
}

const createLinkAppearance = (items: LinkAppearance): object => {
  missingStateWarning({
    items,
    props: ['base', 'hover', 'active', 'focus'],
    cb: (prop: string) => {
      console.error(
        `Themer.createLinkAppearance() is missing a ${prop} item `,
        items
      )
    }
  })

  return {
    ...items.base,
    [hoverState]: createAppearance(items.hover),
    [activeState]: createAppearance(items.active),
    [focusState]: createAppearance(items.focus)
  }
}

export default createLinkAppearance
