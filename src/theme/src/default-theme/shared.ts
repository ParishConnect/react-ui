import scales from './foundational-styles/scales'
import { palette } from './foundational-styles/index'

const defaultControlStyles = (themeColor: string = 'blue') => ({
  disabled: {
    opacity: 0.8,
    backgroundColor: scales.neutral.N2A,
    boxShadow: 'none',
    color: scales.neutral.N7A
  },
  base: {
    backgroundColor: scales.neutral.N3A,
    transition: 'background-color 225ms'
  },
  hover: {
    backgroundColor: scales.neutral.N4A
  },
  focus: {
    boxShadow: `0 0 0 3px ${palette[themeColor].light}, inset 0 0 0 1px ${
      scales.neutral.N5A
    }, inset 0 -1px 1px 0 ${scales.neutral.N4A}`
  },
  active: {
    backgroundColor: palette[themeColor].light,
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 1px 1px 0 ${
      scales.neutral.N2A
    }`
  },
  focusAndActive: {
    boxShadow: `0 0 0 3px ${palette[themeColor].light}, inset 0 0 0 1px ${
      scales.neutral.N5A
    }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
  }
})

// Can't figure out to disable rule for xo linter.
const ignore = null

export { defaultControlStyles, ignore }
