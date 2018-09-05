import tinycolor from 'tinycolor2'
import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import scales from '../foundational-styles/scales'
import gradients from '../foundational-styles/gradients'
import palette from '../foundational-styles/palette'

const defaultAppearance = appearance => {
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
      background:
        typeof appearance !== 'undefined'
          ? gradients[appearance]
          : scales.neutral.N3A,
      boxShadow:
        typeof appearance !== 'undefined'
          ? `0 0 1px ${tinycolor(palette[appearance].base).lighten(
              20
            )}, 0 3px 6px -3px ${tinycolor(palette[appearance].base).lighten(
              20
            )}`
          : `0 0 1px ${scales.neutral.N4A}, 0 3px 6px -3px ${
              scales.neutral.N4A
            }`,
      color:
        typeof appearance !== 'undefined'
          ? tinycolor(palette[appearance].base).isDark()
            ? 'white'
            : scales.neutral.N9
          : scales.neutral.N9
    },
    current: {}
  })
}

/**
 * Get the appearance of a `Tab`.
 * @param {string} appearance
 * @return {string} the appearance object.
 */
const getTabAppearance = appearance => {
  return defaultAppearance(appearance)
}

/**
 * Get the className of a `Tab`.
 * @param {string} appearance
 * @return {string} the appearance class name.
 */
export default memoizeClassName(getTabAppearance)
