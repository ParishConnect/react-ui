import * as React from 'react'
import { noop } from 'lodash'
import { Omit } from 'utility-types'
import { Pane, PaneProps } from '../../layers'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import { IntentType } from '../../constants/index'

export interface MenuItemProps extends Omit<PaneProps, 'appearance'> {
  /**
   * Element type to use for the menu item.
   * For example: `<MenuItem is={ReactRouterLink}>...</MenuItem>`
   */
  is?: string | any
  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect?: any
  /**
   * The icon before the label.
   */
  icon?: any

  /**
   * Secondary text shown on the right.
   */
  secondaryText?: React.ReactNode

  /**
   * The default theme only supports one default appearance.
   */
  appearance?: string

  /**
   * The intent of the menu item.
   */
  intent?: IntentType
  onClick?: any
}

class MenuItem extends React.PureComponent<MenuItemProps> {
  static contextType = ThemeContext
  static defaultProps = {
    is: 'div',
    intent: 'none',
    appearance: 'default',
    onSelect: noop
  }

  handleClick = (event: any) => {
    this.props.onSelect(event)

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event)
    }
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.props.onSelect(event)
      event.preventDefault()
    }

    if (typeof this.props.onKeyPress === 'function') {
      this.props.onKeyPress(event)
    }
  }

  render() {
    const {
      is,
      children,
      appearance,
      secondaryText,
      intent,
      icon: Icon,
      ...passthroughProps
    } = this.props
    const theme = this.context

    const themedClassName = theme.getMenuItemClassName(appearance, 'none')

    return (
      <Pane
        is={is}
        role="menuitem"
        className={themedClassName}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        height={Icon ? 40 : 32}
        tabIndex={0}
        data-isselectable="true"
        display="flex"
        alignItems="center"
        {...passthroughProps}
      >
        {Icon && (
          <Icon
            color={intent === 'none' ? 'default' : intent}
            marginLeft={16}
            marginRight={-4}
            size={16}
            flexShrink={0}
          />
        )}
        <Text color={intent} marginLeft={16} marginRight={16} flex={1}>
          {children}
        </Text>
        {secondaryText && (
          <Text marginRight={16} color="muted">
            {secondaryText}
          </Text>
        )}
      </Pane>
    )
  }
}

export default MenuItem
