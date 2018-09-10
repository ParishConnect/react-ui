import tinycolor from 'tinycolor2'
import palette from './palette'

/* Gradients are used for layers, button and indicators */

const gradients = {
  yellow: {
    start: palette.yellow.light,
    end: palette.yellow.dark
  },
  green: {
    start: tinycolor(palette.green.base)
      .lighten(5)
      .saturate(10)
      .spin(-35),
    end: palette.green.dark
  },
  orange: {
    start: tinycolor(palette.orange.base)
      .lighten(-2)
      .saturate(15)
      .spin(15),
    end: palette.orange.dark
  },
  red: {
    start: tinycolor(palette.red.base)
      .lighten(5)
      .saturate(15)
      .spin(20),
    end: palette.red.dark
  },
  blue: {
    start: tinycolor(palette.blue.base)
      .lighten(10)
      .saturate(20)
      .spin(-18),
    end: palette.blue.base
  },
  purple: {
    start: tinycolor(palette.red.base)
      .lighten(-2)
      .saturate(10)
      .spin(-25),
    end: palette.purple.dark
  },
  teal: {
    start: tinycolor(palette.teal.base)
      .lighten(20)
      .saturate(20)
      .spin(-40),
    end: palette.teal.base
  }
}

export default gradients
