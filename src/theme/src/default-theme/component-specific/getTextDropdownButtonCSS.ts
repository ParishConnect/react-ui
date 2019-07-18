import { Themer } from '../../../../themer/index'
import scales from '../foundational-styles/scales'

const defaultAppearance = Themer.createTextDropdownButtonAppearance({
  base: {
    borderRadius: 3
  },
  hover: {},
  focus: {
    boxShadow: `0 0 0 3px ${scales.blue.B5A}`
  },
  active: {},
  disabled: {
    opacity: 0.5
  }
})

/**
 * Get the appearance of a `TextDropdownButton`.
 */
const getTextDropdownButtonAppearance = () => {
  return defaultAppearance
}

export default getTextDropdownButtonAppearance
