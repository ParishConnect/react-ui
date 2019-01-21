import { StackingOrder } from '../../constants'
import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const baseStyle = {
  WebkitFontSmoothing: 'antialiased',
  boxSizing: 'border-box',
  textDecoration: 'none',
  transition: '80ms ease-in-out',
  WebkitAppearance: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  textTransform: 'uppercase'
}

const disabledState = '[disabled="true"], [data-disabled="true"]'
const hoverState = '&:not([disabled="true"]):not([data-disabled="true"]):hover'
const activeState =
  '&:not([disabled="true"]):not([data-disabled="true"]):active, &:not([disabled="true"]):not([data-disabled="true"])[data-popover-opened="true"], &:not([disabled="true"]):not([data-disabled="true"])[data-active="true"]'
const focusState = '& input:focus + label'

export interface SegementedControlRadioAppearance {
  base: object
  hover: object
  disabled: object
  active: {
    labelColor?: object
    [key: string]: any
  }
  focus: object
}

const createSegmentedControlRadioAppearance = (
  items: SegementedControlRadioAppearance
) => {
  missingStateWarning({
    items,
    props: ['base', 'hover', 'disabled', 'active', 'focus'],
    cb: (prop: string) => {
      console.error(
        `Themer.createSegmentedControlRadioAppearance() is missing a ${prop} item `,
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
    [hoverState]: createAppearance(items.hover),
    [focusState]: {
      zIndex: StackingOrder.FOCUSED,
      ...createAppearance(items.focus)
    },
    [activeState]: createAppearance(items.active),
    '&[data-active="true"]': {
      cursor: 'default',
      padding: '0 -10px',
      margin: '0 -10px',
      zIndex: 5,
      label: {
        color: items.active.labelColor
      }
    }
  }
}

export default createSegmentedControlRadioAppearance
