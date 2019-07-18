import tinycolor from 'tinycolor2'
import { Themer } from '../../../../themer/index'
import palette from '../foundational-styles/palette'

/**
 * The link appearance unlike the Button is based on the color property.
 * Currently the Link does not support the Intent or the appearance interface.
 */
const getLinkAppearance = (color = 'blue'): object => {
  switch (color) {
    case 'neutral':
      return Themer.createLinkAppearance({
        base: {
          color: palette.neutral.base
        },
        hover: {
          color: tinycolor(palette.neutral.base)
            .lighten(10)
            .toString()
        },
        active: {
          color: tinycolor(palette.neutral.base)
            .darken(10)
            .toString()
        },
        focus: {
          boxShadow: `0 0 0 2px ${tinycolor(palette.neutral.base)
            .setAlpha(0.4)
            .toString()}`
        }
      })
    case 'green':
      return Themer.createLinkAppearance({
        base: {
          color: palette.green.base
        },
        hover: {
          color: tinycolor(palette.green.base)
            .lighten(10)
            .toString()
        },
        active: {
          color: tinycolor(palette.green.base)
            .darken(10)
            .toString()
        },
        focus: {
          boxShadow: `0 0 0 2px ${tinycolor(palette.green.base)
            .setAlpha(0.4)
            .toString()}`
        }
      })
    case 'blue':
      return Themer.createLinkAppearance({
        base: {
          color: palette.blue.base
        },
        hover: {
          color: tinycolor(palette.blue.base)
            .lighten(10)
            .toString()
        },
        active: {
          color: tinycolor(palette.blue.base)
            .darken(10)
            .toString()
        },
        focus: {
          boxShadow: `0 0 0 2px ${tinycolor(palette.blue.base)
            .setAlpha(0.4)
            .toString()}`
        }
      })
    case 'default':
    default:
      return Themer.createLinkAppearance({
        base: {
          color: palette[color].base
        },
        hover: {
          color: tinycolor(palette[color].base)
            .lighten(10)
            .toString()
        },
        active: {
          color: tinycolor(palette[color].base)
            .darken(10)
            .toString()
        },
        focus: {
          boxShadow: `0 0 0 2px ${tinycolor(palette[color].base)
            .setAlpha(0.4)
            .toString()}`
        }
      })
  }
}

export default getLinkAppearance
