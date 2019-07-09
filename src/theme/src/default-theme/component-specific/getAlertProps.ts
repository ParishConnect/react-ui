import scales from '../foundational-styles/scales'
import { css } from '@emotion/core'
import colors from '../foundational-styles/colors'
import { IntentType } from '../../../../constants'

const getTrimStyle = (intent: string) =>
  css({
    '&::before': {
      content: "''",
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
export interface AlertProps {
  appearance: 'card' | 'default'
  intent: IntentType
  hasTrim: boolean
}
const getAlertProps = ({ appearance, intent, hasTrim }: AlertProps): object => {
  const trimCSS = hasTrim ? getTrimStyle(intent) : ''

  switch (appearance) {
    case 'card':
      return { elevation: 1, borderRadius: 3, css: trimCSS }
    case 'default':
    default:
      return {
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
        css: trimCSS
      }
  }
}

export default getAlertProps
