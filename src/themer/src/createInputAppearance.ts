import { StackingOrder } from '../../constants'
import missingStateWarning from './missingStateWarning'
import createAppearance from './createAppearance'

const baseStyle = {
  WebkitAppearance: 'none',
  border: 'none'
}

const invalidState = '&[aria-invalid="true"]'
const placeholder = '&::placeholder'
const focusState = '&:focus'
const disabledState = '&:disabled'

export interface InputAppearance {
  base: object
  invalid: object
  placeholder: object
  focus: object
  disabled: object
}

const createInputAppearance: any = (items: InputAppearance): object => {
  missingStateWarning({
    items,
    props: ['base', 'invalid', 'placeholder', 'focus', 'disabled'],
    cb: (prop: string) => {
      console.error(
        `Themer.createCheckboxAppearance() is missing a ${prop} item `,
        items
      )
    }
  })

  return {
    ...baseStyle,
    ...createAppearance(items.base),
    [invalidState]: createAppearance(items.invalid),
    [placeholder]: createAppearance(items.placeholder),
    [focusState]: {
      zIndex: StackingOrder.FOCUSED,
      ...createAppearance(items.focus)
    },
    [disabledState]: {
      cursor: 'not-allowed',
      ...createAppearance(items.disabled)
    }
  }
}

export default createInputAppearance
