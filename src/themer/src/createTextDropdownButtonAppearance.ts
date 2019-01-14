import { StackingOrder } from '../../constants'
import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const baseStyle = {
  WebkitFontSmoothing: 'antialiased',
  WebkitAppearance: 'none',
  verticalAlign: 'middle',
  textDecoration: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  background: 'none'
}

const disabledState = `[disabled], [data-disabled]`
const hoverState = '&:not([disabled]):not([data-disabled]):hover'
const focusState = '&:not([disabled]):not([data-disabled]):focus'
const activeState =
  '&:not([disabled]):not([data-disabled]):active, &:not([disabled]):not([data-disabled])[aria-expanded="true"], &:not([disabled]):not([data-disabled])[data-active]'

export interface TextDropdownButtonAppearance {
  base: object
  hover: object
  focus: object
  active: object
  disabled: object
}

const createButtonAppearance = (
  items: TextDropdownButtonAppearance
): object => {
  missingStateWarning({
    items,
    props: ['base', 'hover', 'focus', 'active', 'disabled'],
    cb: (prop: string) => {
      console.error(
        `Themer.createTextDropdownButtonAppearance() is missing a ${prop} state in items: `,
        items
      )
    }
  })

  return {
    ...baseStyle,
    ...createAppearance(items.base),
    [disabledState]: createAppearance(items.disabled),
    [hoverState]: createAppearance(items.hover),
    [focusState]: {
      zIndex: StackingOrder.FOCUSED,
      ...createAppearance(items.focus)
    },
    [activeState]: createAppearance(items.active)
  }
}
export default createButtonAppearance
