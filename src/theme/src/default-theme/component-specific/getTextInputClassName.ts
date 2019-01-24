import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import scales from '../foundational-styles/scales'
import palette from '../foundational-styles/palette'

const InputAppearances = { default: {}, neutral: {}, editorTitle: {} }

InputAppearances.default = Themer.createInputAppearance({
  base: {
    backgroundColor: 'white',
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 1px 2px ${
      scales.neutral.N4A
    }`
  },
  invalid: {
    boxShadow: `inset 0 0 0 1px ${palette.red.base}, inset 0 1px 2px ${
      scales.neutral.N4A
    }`
  },
  placeholder: {
    color: scales.neutral.N6A
  },
  focus: {
    outline: 'none',
    boxShadow: `inset 0 0 2px ${scales.neutral.N4A}, inset 0 0 0 1px ${
      scales.blue.B7
    }, 0 0 0 3px ${scales.blue.B4A}`
  },
  disabled: {
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
    backgroundColor: scales.neutral.N2
  }
})

InputAppearances.neutral = Themer.createInputAppearance({
  base: {
    backgroundColor: scales.neutral.N2A
  },
  invalid: {
    boxShadow: `inset 0 0 0 1px ${palette.red.base}`
  },
  placeholder: {
    color: scales.neutral.N6A
  },
  focus: {
    outline: 'none',
    backgroundColor: 'white',
    boxShadow: `0 0 0 2px ${scales.blue.B6A}`
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
  appearance: 'neutral' | 'editor-title' | 'default'
): object => {
  switch (appearance) {
    case 'neutral':
      return InputAppearances.neutral
    case 'editor-title':
      return InputAppearances.editorTitle
    default:
      return InputAppearances.default
  }
}

/**
 * Get the className of a `TextInput`.
 */
export default memoizeClassName(getTextInputAppearance)