import { Themer } from '../../../../themer/'
import memoizeClassName from '../utils/memoizeClassName'
import { scales } from '../foundational-styles/'
import {
  getTextColorForIntent,
  getPrimaryButtonStylesForIntent
} from '../helpers'
import { defaultControlStyles } from '../shared'

/**
 * Disabled styles are all the same for all buttons.
 */
const disabled = defaultControlStyles.disabled

/**
 * Get button appearance.
 */
const getButtonAppearance = (
  appearance: any,
  intent: any,
  themeColor: any
): object => {
  switch (appearance) {
    case 'primary': {
      const { linearGradient, focusColor } = getPrimaryButtonStylesForIntent(
        intent,
        themeColor
      )
      return Themer.createButtonAppearance({
        disabled,
        base: {
          color: 'white',
          backgroundColor: 'white',
          backgroundImage: linearGradient.base,
          boxShadow: `inset 0 0 0 0px ${focusColor}, 0 1px 3px ${focusColor}`,
          transition: 'box-shadow 125ms, background-image 125ms'
        },
        hover: {
          backgroundImage: linearGradient.hover,
          boxShadow: `inset 0 0 0 1px ${focusColor}, 0 2px 5px ${focusColor}`
        },
        focus: {
          boxShadow: `inset 0 0 0 1px ${focusColor}, 0 2px 5px ${focusColor}`
        },
        active: {
          backgroundImage: linearGradient.active,
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        },
        focusAndActive: {
          boxShadow: `inset 0 0 0 1px ${focusColor}, 0 2px 5px ${focusColor}`
        }
      })
    }
    case 'minimal': {
      const intentTextColor = getTextColorForIntent(intent, themeColor)

      return Themer.createButtonAppearance({
        disabled,
        base: {
          color: intentTextColor,
          backgroundColor: 'transparent'
        },
        hover: {
          backgroundColor: scales.neutral.N2A
        },
        focus: {
          boxShadow: `0 0 0 3px ${scales.blue.B5A}`
        },
        active: {
          backgroundImage: 'none',
          backgroundColor: scales.blue.B3A
        },
        focusAndActive: {}
      })
    }
    case 'overlay': {
      return Themer.createButtonAppearance({
        disabled,
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
          ...defaultControlStyles.base
        },
        hover: defaultControlStyles.hover,
        focus: defaultControlStyles.focus,
        active: defaultControlStyles.active,
        focusAndActive: defaultControlStyles.focusAndActive
      })
    }
  }
}

/**
 * Get the className of a `Button`|`IconButton`.
 */
export default memoizeClassName(getButtonAppearance)