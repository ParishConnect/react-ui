import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const defaultState = '& + div'
const disabledState = '&[disabled] + div'
const hoverState = '&:not([disabled]):hover + div'
const focusState = '&:not([disabled]):focus + div'
const activeState = '&:not([disabled]):active + div'
const checkedState = '&:checked + div, &:indeterminate + div'
const checkedHoverState =
  '&:not([disabled]):checked:hover + div, &:not([disabled]):indeterminate:hover + div'
const checkedActiveState =
  '&:not([disabled]):checked:active + div, &:not([disabled]):indeterminate:active + div'
const checkedDisabledState =
  '&[disabled]:checked + div, &[disabled]:indeterminate + div'

const hiddenCheckboxStyle = {
  border: '0',
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: '1',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1',
  opacity: '0'
}

const baseStyle = {
  WebkitFontSmoothing: 'antialiased',
  textDecoration: 'none',
  WebkitAppearance: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer'
}

const checkedStyles = {
  '& > svg': {
    display: 'block'
  }
}

export interface CheckboxAppearance {
  base: object
  disabled: object
  hover: object
  active: object
  focus: object
  checked: object
  checkedDisabled: object
  checkedActive: object
  checkedHover: object
}

const createCheckboxAppearance: any = (items: CheckboxAppearance): object => {
  missingStateWarning({
    items,
    props: [
      'base',
      'hover',
      'focus',
      'active',
      'disabled',
      'checked',
      'checkedDisabled',
      'checkedHover',
      'checkedActive'
    ],
    cb: (prop: string) => {
      console.error(
        `Themer.createCheckboxAppearance() is missing a ${prop} state in items: `,
        items
      )
    }
  })

  return {
    ...hiddenCheckboxStyle,
    '& + div > svg': { display: 'none' },
    [defaultState]: { ...baseStyle, ...createAppearance(items.base) },
    [hoverState]: createAppearance(items.hover),
    [focusState]: createAppearance(items.focus),
    [activeState]: createAppearance(items.active),
    [disabledState]: createAppearance(items.disabled),
    [checkedState]: { ...checkedStyles, ...createAppearance(items.checked) },
    [checkedHoverState]: {
      ...checkedStyles,
      ...createAppearance(items.checkedHover)
    },
    [checkedDisabledState]: {
      ...checkedStyles,
      ...createAppearance(items.checkedDisabled)
    },
    [checkedActiveState]: {
      ...checkedStyles,
      ...createAppearance(items.checkedActive)
    }
  }
}

export default createCheckboxAppearance
