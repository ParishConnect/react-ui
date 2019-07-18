import { Themer } from '../../../../themer/index'
import palette from '../foundational-styles/palette'
import scales from '../foundational-styles/scales'
import { defaultControlStyles } from '../shared'

/**
 * Get the appearance of a `Select`.
 */
const getSelectAppearance = (_, themeColor: string) =>
  Themer.createSelectAppearance({
    base: defaultControlStyles(themeColor).base,
    disabled: defaultControlStyles(themeColor).disabled,
    invalid: {
      boxShadow: `inset 0 0 0 1px ${palette.red.base}, inset 0 1px 2px ${scales.neutral.N4A}`
    },
    hover: defaultControlStyles(themeColor).hover,
    focus: defaultControlStyles(themeColor).focus,
    active: defaultControlStyles(themeColor).active
  })

export default getSelectAppearance
