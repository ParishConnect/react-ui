import tinycolor from 'tinycolor2'
import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import scales from '../foundational-styles/scales'
import palette from '../foundational-styles/palette'
import gradients from '../foundational-styles/gradients'
import { getPrimaryButtonStylesForIntent } from '../helpers'
import { ThemeColor } from '../../../../constants/src/Theme'

const primaryStyle = (themeColor: ThemeColor) =>
  getPrimaryButtonStylesForIntent(null, themeColor)

const defaultAppearance = (themeColor: ThemeColor) => {
  return Themer.createCheckboxAppearance({
    base: {
      color: 'white',
      backgroundColor: 'white',
      backgroundImage: `linear-gradient(to top, ${scales.neutral.N2A}, ${
        scales.neutral.N3A
      })`,
      boxShadow: `inset 0 0 0 1px ${scales.neutral.N1A}, inset 0 -1px 1px 0 ${
        scales.neutral.N3A
      }`
    },
    disabled: {
      cursor: 'not-allowed',
      backgroundColor: scales.neutral.N4A,
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
      boxShadow: `0 0 0 2px ${tinycolor(palette[themeColor].base).setAlpha(
        0.4
      )}, inset 0 0 0 1px ${tinycolor(palette[themeColor].base).setAlpha(
        0.5
      )}, inset 0 -1px 1px 0 ${tinycolor(palette[themeColor].base).setAlpha(
        0.3
      )}`
    },
    active: {
      backgroundImage: 'none',
      backgroundColor: scales.blue.B3A,
      boxShadow: `inset 0 0 0 1px ${scales.blue.B5A}`
    },
    checked: {
      color: 'white',
      backgroundImage: `linear-gradient(-145deg, ${
        gradients[themeColor].start
      }, ${gradients[themeColor].end})`,
      boxShadow: `0 0 1px ${tinycolor(palette[themeColor].base).darken() ||
        scales.blue.B5A}`
    },
    checkedHover: {
      color: 'white',
      backgroundImage: `linear-gradient(-145deg, ${tinycolor(
        gradients[themeColor].start
      ).darken()}, ${tinycolor(gradients[themeColor].end).darken()})`,
      boxShadow: `0 0 1px ${tinycolor(palette[themeColor].base).darken(15) ||
        scales.blue.B5A}`
    },
    checkedDisabled: {
      color: palette[themeColor].dark,
      backgroundImage: `none`,
      backgroundColor: `${palette[themeColor].base}`,
      boxShadow: `inset 0 0 0 1px ${tinycolor(
        palette[themeColor].dark
      ).setAlpha(0.3)}, inset 0 -1px 1px 0 ${tinycolor(
        palette[themeColor].base
      ).setAlpha(0.3)}`
    },
    checkedActive: {
      color: 'white',
      backgroundImage: primaryStyle(themeColor).linearGradient.active,
      boxShadow: `inset 0 0 0 1px ${scales.blue.B4A}, inset 0 -1px 1px 0 ${
        scales.blue.B2A
      }`
    }
  })
}

/**
 * There is only a single appearance in the default theme.
 */
const getCheckboxAppearance = (themeColor: ThemeColor) => {
  return defaultAppearance(themeColor)
}

/**
 * Get the className of a `Checkbox`.
 * @param {string} themeColor
 * @return {string} the appearance class name.
 */
export default memoizeClassName(getCheckboxAppearance)
