import * as React from 'react'
import { IconButton } from '../../buttons'
import { IntentType } from '../../constants'
import { XIcon } from '../../icons/index'
import { Pane } from '../../layers'
import { ThemeContext } from '../../theme'
import { getTextColorForIntent } from '../../theme/src/default-theme/helpers'
import { Heading, Paragraph } from '../../typography'

export interface AlertProps {
  /**
   * The action attached to the alert. Passed as a function (optional)
   */
  action?: { title: string; action: Function }
  /**
   * The title of the alert.
   */
  title: React.ReactNode
  /**
   * The intent of the alert.
   */
  intent?: IntentType
  /**
   * When true, show a border on the left matching the type.
   */
  hasTrim?: boolean
  /**
   * When true, show a icon on the left matching the type,
   */
  hasIcon?: boolean
  /**
   * The appearance of the alert.
   */
  appearance?: 'default' | 'card' | string
  /**
   * When true, show a remove icon button.
   */
  isRemoveable?: boolean
  /**
   * Function called when the remove button is clicked.
   */
  onRemove?: Function
}

class Alert extends React.PureComponent<any> {
  public static contextType = ThemeContext
  public static defaultProps = {
    intent: 'none',
    hasTrim: true,
    hasIcon: true,
    isRemoveable: false,
    appearance: 'default'
  }

  getIconForIntent = (intent: IntentType): { icon: any; color: string } => {
    const theme = this.context

    return theme.getIconForIntent(intent)
  }

  render() {
    const {
      action,
      title,
      intent,
      hasTrim,
      hasIcon,
      children,
      appearance,
      isRemoveable,
      onRemove,
      css,
      ...props
    } = this.props
    const theme = this.context

    const themeProps = theme.getAlertProps({
      appearance,
      intent,
      hasTrim
    })

    /**
     * Check for action props
     */
    const hasAction =
      typeof action !== 'undefined' && typeof action.title !== 'undefined'

    const Icon = hasIcon ? this.getIconForIntent(intent).icon : ''

    return (
      <Pane
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
            <Icon color={this.getIconForIntent(intent).color} />
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
                icon={XIcon}
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
                {action && action.title!}
              </Heading>
            </Pane>
          )}
        </Pane>
      </Pane>
    )
  }
}

export default Alert
