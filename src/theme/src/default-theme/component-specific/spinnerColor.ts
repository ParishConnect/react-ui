import tinycolor from 'tinycolor2'
import { scales, colors } from '../foundational-styles/'
import themedProperty from '../utils/themedProperty'

const spinnerColor = ({
  color,
  adaptive,
  baseColor
}: {
  color: string
  adaptive: boolean
  baseColor: string
}): string => {
  const defaultColor = scales.neutral.N6
  if (adaptive) {
    if (!baseColor) {
      return defaultColor
    }

    return tinycolor(baseColor).isDark() ? scales.neutral.N1 : defaultColor
  }

  if (color) {
    return themedProperty(colors.text, color)
  }

  return defaultColor
}

export default spinnerColor
