import tinycolor from 'tinycolor2'
import { scales, palette } from '../foundational-styles/'

const spinnerColor = themeColor => {
  if (palette[themeColor]) {
    return tinycolor(palette[themeColor].base).isDark()
      ? scales.neutral.N1
      : scales.neutral.N6A
  }
  return scales.neutral.N6A
}

export default spinnerColor
