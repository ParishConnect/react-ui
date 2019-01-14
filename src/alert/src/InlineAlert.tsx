import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  spacing,
  dimensions,
  position,
  layout
} from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'
import { Pane, PaneProps } from '../../layers'
import { Text } from '../../typography'
import { Icon } from '../../icon'
import { ThemeType, IntentType } from '../../constants/'

type InlineAlertProps = PaneProps & {
  theme: ThemeType
  intent?: IntentType
  hasIcon?: boolean
  size?: number
}

class InlineAlert extends React.PureComponent<InlineAlertProps> {
  static propTypes = {
    /**
     * Composes some Box APIs.
     */
    ...spacing.propTypes,
    ...position.propTypes,
    ...layout.propTypes,
    ...dimensions.propTypes,

    /**
     * The content of the alert.
     */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /**
     * The intent of the alert. This should always be set explicitly.
     */
    intent: PropTypes.oneOf(['none', 'success', 'warning', 'danger'])
      .isRequired,

    /**
     * When true, show a icon on the left matching the type.
     * There is no point not showing this.
     */
    hasIcon: PropTypes.bool,

    /**
     * The size of the Text.
     */
    size: PropTypes.number,

    /**
     * Theme provided by ThemeProvider.
     */
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    intent: 'none',
    hasIcon: true,
    size: 400
  }

  getIconForIntent = intent => {
    const { theme } = this.props

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

export default withTheme(InlineAlert as any)
