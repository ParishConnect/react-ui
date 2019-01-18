import * as React from 'react'
import { Pane, PaneProps } from '../../layers'
import { Text } from '../../typography'
import { Icon } from '../../icon'
import { IntentType } from '../../constants/'
import { ThemeContext } from '../../theme'

export interface InlineAlertProps extends PaneProps {
  /**
   * The intent of the alert. This should always be set explicitly.
   */
  intent?: IntentType
  /**
   * When true, show a icon on the left matching the type.
   * There is no point not showing this.
   */
  hasIcon?: boolean
  /**
   * The size of the Text.
   */
  size?: 300 | 400 | 500 | 600 | 700 | 800
}

class InlineAlert extends React.PureComponent<InlineAlertProps> {
  static contextType = ThemeContext

  static defaultProps = {
    intent: 'none',
    hasIcon: true,
    size: 400
  }

  getIconForIntent = (intent: IntentType = 'none') => {
    const theme = this.context

    return <Icon size={14} marginTop={2} {...theme.getIconForIntent(intent)} />
  }

  render() {
    const { children, intent, hasIcon, size, ...props } = this.props

    return (
      <Pane alignItems="center" display="flex" {...props}>
        {hasIcon && (
          <Pane display="inline" marginRight={8}>
            {this.getIconForIntent(intent)}
          </Pane>
        )}
        <Text size={size} fontWeight={500}>
          {children}
        </Text>
      </Pane>
    )
  }
}

export default InlineAlert
