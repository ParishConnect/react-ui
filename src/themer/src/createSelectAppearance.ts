import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const baseStyle = {
  WebkitAppearance: 'none',
  border: 'none',
  flex: 1,
  background: 'none',
  width: '100%',
  WebkitFontSmoothing: 'antialiased',
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  ':-moz-focusring': {
    color: 'transparent',
    textShadow: '0 0 0 #000'
  }
}

const disabledState = '[disabled]'
const invalidState = '&[aria-invalid]'
const hoverState = '&:not([disabled]):hover'
const focusState = '&:not([disabled]):focus'
const activeState = '&:not([disabled]):active'

export interface SelectAppearance {
  base: object
  disabled: object
  invalid: object
  hover: object
  active: object
  focus: object
}

const createSelectAppearance = (items: SelectAppearance): object => {
  missingStateWarning({
    items,
    props: ['base', 'disabled', 'invalid', 'hover', 'active', 'focus'],
    cb: (prop: string) => {
      console.error(
        `Themer.createSelectAppearance() is missing a ${prop} item `,
        items
      )
    }
  })

  return {
    ...baseStyle,
    ...createAppearance(items.base),
    [disabledState]: {
      cursor: 'not-allowed',
      ...createAppearance(items.disabled)
    },
    [invalidState]: createAppearance(items.invalid),
    [hoverState]: createAppearance(items.hover),
    [focusState]: createAppearance(items.focus),
    [activeState]: createAppearance(items.active)
  }
}

export default createSelectAppearance
