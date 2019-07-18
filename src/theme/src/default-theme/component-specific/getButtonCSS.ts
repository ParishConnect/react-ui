import { Themer } from '../../../../themer/index'
import { scales } from '../foundational-styles/index'
import {
  getTextColorForIntent,
  getPrimaryButtonStylesForIntent
} from '../helpers'
import { defaultControlStyles } from '../shared'
import tinycolor from 'tinycolor2'

/**
 * Get button appearance.
 */
const getButtonAppearance = (
  appearance: any,
  intent: any,
  themeColor: any
): object => {
  const defaultButtonStyles = defaultControlStyles(themeColor)
  /**
   * Disabled styles are all the same for all buttons.
   */
  const disabled = defaultButtonStyles.disabled
  switch (appearance) {
    case 'primary': {
      const { linearGradient, focusColor } = getPrimaryButtonStylesForIntent(
        intent,
        themeColor
      )
      return Themer.createButtonAppearance({
        disabled: {
          ...disabled,
          backgroundColor: focusColor,
          backgroundImage: 'none',
          color: 'rgba(0,0,0,0.5)'
        },
        base: {
          color: 'white',
          backgroundColor: 'white',
          backgroundImage: linearGradient.base,
          boxShadow: `inset 0 0 0 0px ${focusColor}, 0 1px 6px -0.5px ${focusColor}`,
          transition: 'box-shadow 125ms, background-image 125ms'
        },
        hover: {
          backgroundImage: linearGradient.hover,
          boxShadow: `inset 0 0 0 1px ${focusColor}, 0 2px 5px ${focusColor}`
        },
        focus: {
          boxShadow: `0 0 0 2px ${focusColor}, 0 1px 1px 0 ${focusColor}`
        },
        active: {
          backgroundImage: linearGradient.active,
          boxShadow: `inset 0 0 0 1px ${focusColor}, inset 0 1px 1px 0 ${focusColor}`
        },
        focusAndActive: {
          boxShadow: `inset 0 0 0 1px ${focusColor}, 0 2px 5px ${focusColor}`
        }
      })
    }
    case 'minimal': {
      const intentTextColor = getTextColorForIntent(intent, themeColor)

      return Themer.createButtonAppearance({
        disabled: { ...disabled, backgroundColor: 'transparent' },
        base: {
          color: intentTextColor,
          backgroundColor: 'transparent'
        },
        hover: {
          backgroundColor: scales.neutral.N3A
        },
        focus: {
          boxShadow: `0 0 0 2px ${tinycolor(intentTextColor).lighten(40)}`
        },
        active: {
          backgroundColor: scales.neutral.N4A
        },
        focusAndActive: {}
      })
    }
    case 'overlay': {
      return Themer.createButtonAppearance({
        disabled: {
          ...disabled,
          backgroundColor: 'black',
          color: 'gray'
        },
        base: {
          color: 'white',
          fill: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)'
        },
        hover: {
          backgroundColor: 'rgba(0,0,0,0.8)'
        },
        focus: {
          boxShadow: `0 0 0 1.5px rgba(255,255,255,0.5)`
        },
        active: {
          backgroundColor: 'black'
        },
        focusAndActive: {}
      })
    }
    case 'default':
    default: {
      const intentTextColor = getTextColorForIntent(intent, themeColor)
      return Themer.createButtonAppearance({
        disabled,
        base: {
          color: intentTextColor,
          ...defaultButtonStyles.base
        },
        hover: {
          boxShadow: `0 0 0 2px ${tinycolor(intentTextColor).lighten(40)}`
        },
        focus: defaultButtonStyles.focus,
        active: defaultButtonStyles.active,
        focusAndActive: defaultButtonStyles.focusAndActive
      })
    }
  }
}

export default getButtonAppearance
