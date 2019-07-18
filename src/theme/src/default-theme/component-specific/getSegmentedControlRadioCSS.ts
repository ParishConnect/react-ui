import { Themer } from '../../../../themer/index'
import { elevations, palette, scales } from '../foundational-styles/index'
import { defaultControlStyles } from '../shared'

const defaultAppearance = (themeColor: string = 'blue') => {
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
      borderRadius: 999,
      backgroundColor: scales.neutral.N1,
      boxShadow: elevations.neutral[2],
      labelColor: palette[themeColor].base
    },
    focus: { ...defaultControlStyles(themeColor).focus }
  })
}

/**
 * Get the appearanece of a `SegmentedControlRadio`.
 */
const getSegmentedControlRadioAppearance = (themeColor: string) => {
  return defaultAppearance(themeColor)
}

export default getSegmentedControlRadioAppearance
