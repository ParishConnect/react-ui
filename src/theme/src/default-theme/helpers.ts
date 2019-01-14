import tinycolor from 'tinycolor2'
import { Intent, IntentType } from '../../../constants'
import { colors, gradients, palette } from './foundational-styles'

const linearGradient = (
  top: string,
  bottom: string,
  angle: number | string = -25
): string => {
  return `linear-gradient(${angle}deg, ${bottom}, ${top})`
}

const getTextColorForIntent = (
  intent: IntentType,
  defaultColor: string
): string => {
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

const getLinearGradientWithStates = (
  startColor: string,
  endColor: string,
  intensityMultiplier = 1.3
) => {
  return {
    base: linearGradient(startColor, endColor),
    hover: linearGradient(
      tinycolor(startColor)
        .darken(intensityMultiplier * 5)
        .toString(),
      tinycolor(endColor)
        .darken(intensityMultiplier * 5)
        .toString()
    ),
    active: linearGradient(
      tinycolor(endColor)
        .darken(intensityMultiplier * 5)
        .toString(),
      tinycolor(endColor)
        .darken(intensityMultiplier * 5)
        .toString()
    )
  }
}

interface PrimaryButtonStylesForIntent {
  linearGradient: any
  focusColor: string
}

const getPrimaryButtonStylesForIntent = (
  intent: IntentType | null,
  themeColor: string
): PrimaryButtonStylesForIntent => {
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
