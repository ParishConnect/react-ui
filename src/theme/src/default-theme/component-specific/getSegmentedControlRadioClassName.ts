import { Themer } from '../../../../themer'
import { elevations, palette, scales } from '../foundational-styles'
import { defaultControlStyles } from '../shared'
import memoizeClassName from '../utils/memoizeClassName'

const defaultAppearance = (themeColor: any) => {
  return Themer.createSegmentedControlRadioAppearance({
    base: {
      backgroundColor: scales.neutral.N5,
      color: scales.neutral.N7
    },
    disabled: defaultControlStyles(themeColor).disabled,
    hover: {
      backgroundColor: scales.neutral.N6,
      color: scales.neutral.N8
    },
    active: {
      borderRadius: '9999px',
      backgroundColor: scales.neutral.N1,
      boxShadow: elevations.neutral[2],
      labelColor: palette[themeColor]
        ? palette[themeColor].base
        : scales.blue.B8
    },
    focus: { ...defaultControlStyles(themeColor).focus, borderRadius: 999 }
  })
}

/**
 * Get the appearanece of a `SegmentedControlRadio`.
 */
const getSegmentedControlRadioAppearance = (themeColor: any) => {
  return defaultAppearance(themeColor)
}

/**
 * Get the className of a `SegmentedControlRadio`.
 */
export default memoizeClassName(getSegmentedControlRadioAppearance)
