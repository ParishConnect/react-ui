import { Themer } from '../../../../themer/index'
import palette from '../foundational-styles/palette'
import scales from '../foundational-styles/scales'

const Appearances = {
  default: {},
  neutral: {},
  editableCell: {},
  editorTitle: {}
}

Appearances.default = Themer.createInputAppearance({
  base: {
    backgroundColor: 'white',
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 1px 2px ${scales.neutral.N4A}`
  },
  invalid: {
    boxShadow: `inset 0 0 0 1px ${palette.red.base}, inset 0 1px 2px ${scales.neutral.N4A}`
  },
  placeholder: {
    color: scales.neutral.N6A
  },
  focus: {
    outline: 'none',
    boxShadow: `inset 0 0 2px ${scales.neutral.N4A}, inset 0 0 0 1px ${scales.blue.B7}, 0 0 0 3px ${scales.blue.B4A}`
  },
  disabled: {
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
    backgroundColor: scales.neutral.N2
  }
})

Appearances.editorTitle = Themer.createInputAppearance({
  base: {
    backgroundColor: 'transparent'
  },
  invalid: {
    boxShadow: `inset 0 0 0 1px ${palette.red.light}, inset 0 1px 2px ${palette.red.lightest}`,
    backgroundColor: palette.red.lightest
  },
  placeholder: {
    color: scales.neutral.N6A
  },
  focus: {
    outline: 'none'
  },
  disabled: {
    backgroundColor: scales.neutral.N2
  }
})

Appearances.neutral = Themer.createInputAppearance({
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

Appearances.editableCell = Themer.createInputAppearance({
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
    boxShadow: `0 0 0 2px ${scales.blue.B7}`
  },
  disabled: {
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
    backgroundColor: scales.neutral.N2
  }
})

/**
 * Get the appearance of a `TextInput`.
 */
const getTextareaAppearance = (
  appearance: 'neutral' | 'editable-cell' | 'default' | 'editor-title'
): object => {
  switch (appearance) {
    case 'neutral':
      return Appearances.neutral
    case 'editable-cell':
      return Appearances.editableCell
    case 'editor-title':
      return Appearances.editorTitle
    default:
      return Appearances.default
  }
}

export default getTextareaAppearance
