import tinycolor from 'tinycolor2'
import palette from './palette'
import scales from './scales'

// Gradients are used for layers, button and indicators

const gradients = {
  neutral: {
    start: palette.neutral.base,
    end: palette.neutral.dark
  },
  green: {
    start: palette.green.base,
    end: palette.green.dark
  },
  orange: {
    start: palette.orange.base,
    end: palette.orange.dark
  },
  red: {
    start: palette.red.base,
    end: palette.red.dark
  },
  blue: {
    start: palette.blue.base,
    end: palette.blue.dark
  },
  purple: {
    start: palette.purple.base,
    end: palette.purple.dark
  },
  teal: {
    start: palette.teal.base,
    end: palette.teal.dark
  }
}

export default gradients
