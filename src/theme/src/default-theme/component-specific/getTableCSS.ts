import { Themer } from '../../../../themer/index'
import scales from '../foundational-styles/scales'

const Appearances = { default: {} }

Appearances.default = Themer.createTableCellAppearance({
  focus: {
    outline: 'none',
    backgroundColor: scales.blue.B2A,
    boxShadow: `inset 0 0 0 1px ${scales.blue.B7A}`
  }
})

/**
 * Get the appearance of a `TableCell`.
 */
const getAppearance = () => {
  return Appearances.default
}

export default getAppearance
