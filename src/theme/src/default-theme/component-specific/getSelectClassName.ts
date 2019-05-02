import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import { defaultControlStyles } from '../shared'
import scales from '../foundational-styles/scales'
import palette from '../foundational-styles/palette'

/**
 * Get the appearance of a `Select`.
 */
const getSelectAppearance = (_, themeColor: string) =>
  Themer.createSelectAppearance({
    base: defaultControlStyles(themeColor).base,
    disabled: defaultControlStyles(themeColor).disabled,
    invalid: {
      boxShadow: `inset 0 0 0 1px ${palette.red.base}, inset 0 1px 2px ${
        scales.neutral.N4A
      }`
    },
    hover: defaultControlStyles(themeColor).hover,
    focus: defaultControlStyles(themeColor).focus,
    active: defaultControlStyles(themeColor).active
  })

/**
 * Get the className of a `Select`.
 */
export default memoizeClassName(getSelectAppearance)
