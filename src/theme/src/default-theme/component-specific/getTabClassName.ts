import tinycolor from 'tinycolor2'
import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import { scales, colors, palette } from '../foundational-styles/'

const defaultAppearance = (themeColor: string): object => {
  return Themer.createTabAppearance({
    base: {
      borderRadius: 999
    },
    hover: {
      backgroundColor: scales.neutral.N2A
    },
    focus: {
      boxShadow: `0 0 0 2px ${scales.blue.B5A}`
    },
    active: {
      background: colors.background[themeColor]
        ? colors.background[themeColor]
        : scales.neutral.N3A,
      boxShadow:
        typeof themeColor !== 'undefined'
          ? `0 1px 4px -1px ${tinycolor(palette[themeColor].base).lighten(20)}`
          : `0 1px 4px -px ${scales.neutral.N4A}`,
      color: typeof themeColor !== 'undefined' ? 'white' : scales.neutral.N9
    },
    current: {}
  })
}

/**
 * Get the appearance of a `Tab`.
 */
const getTabAppearance = (themeColor: string): object =>
  defaultAppearance(themeColor)

/**
 * Get the className of a `Tab`.
 */
export default memoizeClassName(getTabAppearance)
