import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import { scales, palette } from '../foundational-styles'

const defaultAppearance = (appearance: string): string =>
  Themer.createSwitchAppearance({
    base: {
      transition: 'all 120ms ease-in-out',
      cursor: 'pointer',
      color: 'white',
      backgroundColor: scales.neutral.N5A,
      borderRadius: 9999
    },
    disabled: {
      opacity: 0.5,
      backgroundImage: 'none'
    },
    hover: {
      backgroundColor: scales.neutral.N5A
    },
    active: {
      backgroundColor: scales.neutral.N6A
    },
    focus: {
      boxShadow: `0 0 0 3px ${scales.blue.B6A}`
    },
    checked: {
      backgroundColor: palette[appearance]
        ? palette[appearance].base
        : scales.blue.B8,
      color: 'white'
    },
    checkedHover: {
      backgroundColor: palette[appearance]
        ? palette[appearance].base
        : scales.blue.B8,
      color: 'white'
    },
    checkedActive: {
      backgroundColor: palette[appearance]
        ? palette[appearance].dark
        : scales.blue.B9,
      color: 'white'
    },
    checkedDisabled: {}
  })

/**
 * Get the className of a `Switch`.
 */
const getSwitchAppearance = (appearance: string): string =>
  defaultAppearance(appearance)

/**
 * Get the className of a `Switch`.
 */
export default memoizeClassName(getSwitchAppearance)
