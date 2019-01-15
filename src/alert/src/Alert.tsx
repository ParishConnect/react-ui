import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withTheme } from '../../theme'
import { Pane, PaneProps } from '../../layers'
import { Heading, Paragraph } from '../../typography'
import { IconButton } from '../../buttons'
import { Icon } from '../../icon'
import { getTextColorForIntent } from '../../theme/src/default-theme/helpers'
import { IntentType } from '../../constants'

export type AlertProps = PaneProps & {
  /**
   * The action attached to the alert. Passed as a function (optional)
   */
  action: { title: string; action: Function }
  /**
   * The title of the alert.
   */
  title: React.ReactNode
  /**
   * The intent of the alert.
   */
  intent: IntentType
  /**
   * When true, show a border on the left matching the type.
   */
  hasTrim: boolean
  /**
   * When true, show a icon on the left matching the type,
   */
  hasIcon: boolean
  /**
   * The appearance of the alert.
   */
  appearance: 'default' | 'card'
  /**
   * When true, show a remove icon button.
   */
  isRemoveable: boolean
  /**
   * Function called when the remove button is clicked.
   */
  onRemove: Function
}

class Alert extends React.PureComponent<AlertProps> {
  static defaultProps = {
    intent: 'none',
    hasTrim: true,
    hasIcon: true,
    isRemoveable: false,
    appearance: 'default'
  }

  getIconForIntent = (intent: string) => {
    const { theme } = this.props

    return <Icon size={14} {...theme.getIconForIntent(intent)} />
  }

  render() {
    const {
      theme,

      action,
      title,
      intent,
      hasTrim,
      hasIcon,
      children,
      appearance,
      isRemoveable,
      onRemove,
      ...props
    } = this.props

    /**
     * Note that Alert return a className and additional properties.
     */
    const { className, ...themeProps } = theme.getAlertProps({
      appearance,
      intent,
      hasTrim
    })

    /**
     * Check for action props
     */
    const hasAction =
      typeof action !== 'undefined' && typeof action.title !== 'undefined'

    return (
      <Pane
        className={className}
        role="alert"
        backgroundColor="white"
        overflow="hidden"
        position="relative"
        display="flex"
        paddingY={12}
        paddingX={16}
        {...themeProps}
        {...props}
      >
        {hasIcon && (
          <Pane
            marginRight={10}
            marginLeft={2}
            height={14}
            display="block"
            marginTop={2}
          >
            {this.getIconForIntent(intent)}
          </Pane>
        )}
        <Pane display="flex" width="100%">
          <Pane flex={1}>
            <Heading
              is="h4"
              fontWeight={600}
              size={400}
              marginTop={0}
              marginBottom={0}
            >
              {title}
            </Heading>
            {typeof children === 'string' ? (
              <Paragraph size={400} color="muted">
                {children}
              </Paragraph>
            ) : (
              children
            )}
          </Pane>
          {isRemoveable && (
            <Pane
              marginLeft={24}
              flexShrink={0}
              marginBottom={-2}
              marginTop={-2}
              marginRight={-2}
            >
              <IconButton
                icon="cross"
                appearance="minimal"
                height={24}
                onClick={onRemove}
              />
            </Pane>
          )}
          {hasAction && (
            <Pane flexShrink={0}>
              <Heading
                color={getTextColorForIntent(intent, theme.themeColor)}
                size={100}
                isUppercase
              >
                {action.title}
              </Heading>
            </Pane>
          )}
        </Pane>
      </Pane>
    )
  }
}

export default withTheme(Alert as any)
