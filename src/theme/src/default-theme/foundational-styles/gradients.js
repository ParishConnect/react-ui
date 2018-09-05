import tinycolor from 'tinycolor2'
import { angleGradient } from '../helpers'
import palette from './palette'

/* Gradients are used for layers, button and indicators */

const gradients = {
  yellow: angleGradient(
    palette.yellow.base,
    tinycolor(palette.yellow.dark)
      .lighten(35)
      .saturate(40)
      .spin(-5)
  ),
  green: angleGradient(
    palette.green.dark,
    tinycolor(palette.yellow.base)
      .lighten(-5)
      .saturate(10)
      .spin(25)
  ),
  orange: angleGradient(
    palette.orange.dark,
    tinycolor(palette.yellow.base)
      .lighten(-5)
      .saturate(5)
      .spin(8)
  ),
  red: angleGradient(
    palette.orange.dark,
    tinycolor(palette.red.base)
      .lighten(10)
      .saturate(20)
      .spin(-20)
  ),
  blue: angleGradient(
    palette.blue.base,
    tinycolor(palette.blue.base)
      .lighten(20)
      .saturate(20)
      .spin(-15)
  ),
  purple: angleGradient(
    palette.purple.dark,
    tinycolor(palette.red.base)
      .lighten(10)
      .saturate(10)
      .spin(-10)
  ),
  teal: angleGradient(
    palette.teal.base,
    tinycolor(palette.green.base)
      .lighten(20)
      .saturate(20)
      .spin(-15)
  )
}

export default gradients
