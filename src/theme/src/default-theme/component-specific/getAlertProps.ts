import { css } from 'glamor'
import scales from '../foundational-styles/scales'
import colors from '../foundational-styles/colors'
import { IntentType } from '../../../../constants'

const getTrimStyle = (intent: string) => ({
  '&:before': {
    content: '""',
    width: 3,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.intent[intent]
  }
})

/**
 * Get the themed props for the Alert component.
 */
interface AlertProps {
  appearance: 'card' | 'default'
  intent: IntentType
  hasTrim: boolean
}
const getAlertProps = ({ appearance, intent, hasTrim }: AlertProps): object => {
  const trimClassName = hasTrim ? css(getTrimStyle(intent)).toString() : ''

  switch (appearance) {
    case 'card':
      return { elevation: 1, borderRadius: 3, className: trimClassName }
    case 'default':
    default:
      return {
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
        className: trimClassName
      }
  }
}

export default getAlertProps
