import tinycolor from 'tinycolor2'
import { Intent } from '../../../constants'
import { colors, gradients, palette } from './foundational-styles'

/**
 * @param {String} top - color.
 * @param {String} bottom - color.
 * @return {String} CSS background propery.
 */
const linearGradient = (top, bottom, angle = -25) => {
  return `linear-gradient(${angle}deg, ${bottom}, ${top})`
}

/**
 * @param {Intent} intent
 * @return {String} color
 */
const getTextColorForIntent = (intent, defaultColor) => {
  console.log(defaultColor)

  switch (intent) {
    case Intent.SUCCESS:
      return colors.text.success
    case Intent.DANGER:
      return colors.text.danger
    case Intent.WARNING:
      return colors.text.warning
    default:
      return (
        (palette[defaultColor] && palette[defaultColor].base) ||
        colors.text.default
      )
  }
}

/**
 * @param {String} startColor
 * @param {String} endColor
 * @param {Number} intensityMultiplier - Some colors need more darkening.
 */
const getLinearGradientWithStates = (
  startColor,
  endColor,
  intensityMultiplier = 1.3
) => {
  return {
    base: linearGradient(startColor, endColor),
    hover: linearGradient(
      tinycolor(startColor)
        .darken(5 * intensityMultiplier)
        .toString(),
      tinycolor(endColor)
        .darken(5 * intensityMultiplier)
        .toString()
    ),
    active: linearGradient(
      tinycolor(endColor)
        .darken(5 * intensityMultiplier)
        .toString(),
      tinycolor(endColor)
        .darken(5 * intensityMultiplier)
        .toString()
    )
  }
}

/**
 * Gradients in the default theme have a intentional hue shift.
 * @param {Intent} intent - intent of the gradient.
 * @return {Object} { base, hover, active }
 */
const getPrimaryButtonStylesForIntent = (intent, themeColor) => {
  switch (intent) {
    case Intent.SUCCESS: {
      const startColor = '#2AF598'
      const endColor = '#00D3B2'
      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    case Intent.WARNING: {
      const startColor = '#EE9913'
      const endColor = '#D9822B'
      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(1)
          .toString()
      }
    }
    case Intent.DANGER: {
      const startColor = '#EC4C47'
      const endColor = '#D64540'
      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    default: {
      const startColor = themeColor ? gradients[themeColor].start : '#0788DE'
      const endColor = themeColor ? gradients[themeColor].end : '#116AB8'
      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
  }
}

export {
  linearGradient,
  getTextColorForIntent,
  getLinearGradientWithStates,
  getPrimaryButtonStylesForIntent
}
