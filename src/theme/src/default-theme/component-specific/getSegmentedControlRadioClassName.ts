import { Themer } from '../../../../themer'
import { elevations, palette, scales } from '../foundational-styles'
import { defaultControlStyles } from '../shared'
import memoizeClassName from '../utils/memoizeClassName'

const defaultAppearance = (appearance: any) => {
  return Themer.createSegmentedControlRadioAppearance({
    base: {
      backgroundColor: scales.neutral.N5,
      color: scales.neutral.N7
    },
    disabled: defaultControlStyles.disabled,
    hover: {
      backgroundColor: scales.neutral.N6,
      color: scales.neutral.N8
    },
    active: {
      borderRadius: '9999px',
      backgroundColor: scales.neutral.N1,
      boxShadow: elevations.neutral[2],
      labelColor: palette[appearance]
        ? palette[appearance].base
        : scales.blue.B8
    },
    focus: { ...defaultControlStyles.focus, borderRadius: 999 }
  })
}

/**
 * Get the appearanece of a `SegmentedControlRadio`.
 */
const getSegmentedControlRadioAppearance = (appearance: any) => {
  return defaultAppearance(appearance)
}

/**
 * Get the className of a `SegmentedControlRadio`.
 */
export default memoizeClassName(getSegmentedControlRadioAppearance)
