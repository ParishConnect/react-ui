import tinycolor from 'tinycolor2'
import palette from './palette'
import scales from './scales'

/* Gradients are used for layers, button and indicators */

const gradients = {
  neutral: {
    start: `${tinycolor(scales.neutral.N7)
      .saturate(8)
      .spin(-15)}`,
    end: scales.neutral.N10
  },
  green: {
    start: `${tinycolor(palette.green.base)
      .lighten(8)
      .saturate(-10)
      .spin(-15)}`,
    end: tinycolor(palette.green.dark).darken(5)
  },
  orange: {
    start: `${tinycolor(palette.orange.base)
      .lighten(-2)
      .saturate(15)
      .spin(15)}`,
    end: palette.orange.dark
  },
  red: {
    start: `${tinycolor(palette.red.base)
      .lighten(5)
      .saturate(15)
      .spin(20)}`,
    end: palette.red.dark
  },
  blue: {
    start: `${tinycolor(palette.blue.base)
      .lighten(5)
      .saturate(30)
      .spin(-18)}`,
    end: `${tinycolor(palette.blue.base).lighten(2)}`
  },
  purple: {
    start: `${tinycolor(palette.red.base)
      .lighten(-5)
      .saturate(-5)
      .spin(-25)}`,
    end: tinycolor(palette.purple.dark).lighten(5)
  },
  teal: {
    start: `${tinycolor(palette.teal.base)
      .lighten(20)
      .saturate(20)
      .spin(-40)}`,
    end: palette.teal.base
  }
}

export default gradients
