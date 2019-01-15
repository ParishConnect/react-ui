import tinycolor from 'tinycolor2'
import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import { scales, colors, palette } from '../foundational-styles/'

const defaultAppearance = (appearance: string): object => {
  return Themer.createTabAppearance({
    base: {
      borderRadius: 5
    },
    hover: {
      backgroundColor: scales.neutral.N2A
    },
    focus: {
      boxShadow: `0 0 0 2px ${scales.blue.B5A}`
    },
    active: {
      background: colors.background[appearance]
        ? colors.background[appearance]
        : scales.neutral.N3A,
      boxShadow:
        typeof appearance !== 'undefined'
          ? `0 1px 4px -1px ${tinycolor(palette[appearance].base).lighten(20)}`
          : `0 1px 4px -px ${scales.neutral.N4A}`,
      color: typeof appearance !== 'undefined' ? 'white' : scales.neutral.N9
    },
    current: {}
  })
}

/**
 * Get the appearance of a `Tab`.
 */
const getTabAppearance = (appearance: string): object =>
  defaultAppearance(appearance)

/**
 * Get the className of a `Tab`.
 */
export default memoizeClassName(getTabAppearance)
