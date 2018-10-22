import tinycolor from 'tinycolor2'
import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import scales from '../foundational-styles/scales'
import palette from '../foundational-styles/palette'
import { getPrimaryButtonStylesForIntent } from '../helpers'

const primaryStyle = themeColor =>
  getPrimaryButtonStylesForIntent(null, themeColor)

const defaultAppearance = themeColor => {
  console.log(themeColor)

  return Themer.createCheckboxAppearance({
    base: {
      color: 'white',
      backgroundColor: 'white',
      backgroundImage: `linear-gradient(to top, ${scales.neutral.N2A}, ${
        scales.neutral.N2A
      })`,
      boxShadow: `inset 0 -1px 1px 0 ${scales.neutral.N3A}`
    },
    disabled: {
      cursor: 'not-allowed',
      backgroundColor: scales.neutral.N2A,
      backgroundImage: 'none'
    },
    hover: {
      backgroundImage: `linear-gradient(to top, ${scales.neutral.N2A}, ${
        scales.neutral.N1A
      })`,
      boxShadow: `inset 0 0 0 1px ${scales.neutral.N3A}, inset 0 -1px 1px 0 ${
        scales.neutral.N2A
      }`
    },
    focus: {
      boxShadow: `0 0 0 2px ${scales.blue.B4A}, inset 0 0 0 1px ${
        scales.neutral.N5A
      }, inset 0 -1px 1px 0 ${scales.neutral.N3A}`
    },
    active: {
      backgroundImage: 'none',
      backgroundColor: scales.blue.B3A,
      boxShadow: `inset 0 0 0 1px ${scales.blue.B5A}`
    },
    checked: {
      color: 'white',
      backgroundImage: primaryStyle(themeColor).linearGradient.base,
      boxShadow: `0 0 1px ${tinycolor(palette[themeColor].base).darken() ||
        scales.neutral.N5A}`
    },
    checkedHover: {
      color: 'white',
      backgroundImage: primaryStyle(themeColor).linearGradient.hover,
      boxShadow: `0 0 1px ${tinycolor(palette[themeColor].base).darken(15) ||
        scales.neutral.N5A}`
    },
    checkedDisabled: {
      color: scales.neutral.N6A,
      backgroundImage: `linear-gradient(to top, ${scales.neutral.N2A}, ${
        scales.neutral.N1A
      })`,
      boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${
        scales.neutral.N2A
      }`
    },
    checkedActive: {
      color: 'white',
      backgroundImage: primaryStyle(themeColor).linearGradient.active,
      boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${
        scales.neutral.N2A
      }`
    }
  })
}

/**
 * There is only a single appearance in the default theme.
 * @param {String} themeColor.
 * @return {Object} the appearance of the checkbox.
 */
const getCheckboxAppearance = themeColor => {
  return defaultAppearance(themeColor)
}

/**
 * Get the className of a `Checkbox`.
 * @param {string} themeColor
 * @return {string} the appearance class name.
 */
export default memoizeClassName(getCheckboxAppearance)
