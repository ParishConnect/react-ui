import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import scales from '../foundational-styles/scales'
import palette from '../foundational-styles/palette'

const InputAppearances = {
  default: (themeColor: string) => {},
  neutral: {},
  editorTitle: {}
}

InputAppearances.default = (themeColor: string): object =>
  Themer.createInputAppearance({
    base: {
      backgroundColor: scales.neutral.N3,
      transition: 'box-shadow 100ms, background-color 100ms'
    },
    invalid: {
      boxShadow: `inset 0 0 0 1px ${palette.red.base}, inset 0 1px 2px ${scales.neutral.N4A}`
    },
    placeholder: {
      color: scales.neutral.N7A
    },
    focus: {
      outline: 'none',
      backgroundColor: palette[themeColor].lightest,
      boxShadow: `0 1px 3px ${scales.neutral.N1A}, 0 0 0 1px ${scales.neutral.N2A}, 0 1.5px 4px ${scales.neutral.N3A}`
    },
    disabled: {
      boxShadow: `inset 0 0 0 2px ${scales.neutral.N4A}`,
      backgroundColor: scales.neutral.N4A
    }
  })

InputAppearances.neutral = Themer.createInputAppearance({
  base: {
    backgroundColor: scales.neutral.N2A,
    transition: 'box-shadow 100ms, background-color 100ms'
  },
  invalid: {
    boxShadow: `inset 0 0 0 1px ${palette.red.base}`
  },
  placeholder: {
    color: scales.neutral.N6A
  },
  focus: {
    outline: 'none',

    boxShadow: `0 1px 3px ${scales.neutral.N1A}, 0 0 0 1px ${scales.neutral.N2A}, 0 1.5px 4px ${scales.neutral.N3A}`
  },
  disabled: {
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
    backgroundColor: scales.neutral.N2
  }
})

InputAppearances.editorTitle = Themer.createInputAppearance({
  base: {
    backgroundColor: 'transparent'
  },
  invalid: {
    borderBottom: `solid 2px ${palette.red.base}`
  },
  placeholder: {
    color: scales.neutral.N6A
  },
  focus: {
    outline: 'none'
  },
  disabled: {
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
    backgroundColor: scales.neutral.N2
  }
})

/**
 * Get the appearance of a `TextInput`.
 */
const getTextInputAppearance = (
  appearance: 'neutral' | 'editor-title' | 'default',
  themeColor: string
): object => {
  switch (appearance) {
    case 'neutral':
      return InputAppearances.neutral
    case 'editor-title':
      return InputAppearances.editorTitle
    default:
      return InputAppearances.default(themeColor) as any
  }
}

/**
 * Get the className of a `TextInput`.
 */
export default memoizeClassName(getTextInputAppearance)
