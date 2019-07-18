import { Themer } from '../../../../themer/index'
import { palette, scales } from '../foundational-styles/index'

const defaultAppearance = (appearance: string): object =>
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

const getSwitchAppearance = (appearance: string): object =>
  defaultAppearance(appearance)

export default getSwitchAppearance
