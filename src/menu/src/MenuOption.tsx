import * as React from 'react'

import { Pane } from '../../layers'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import { CheckIcon } from '../../icons/index'

export interface MenuOptionProps {
  /**
   * The id attribute of the menu option.
   */
  id?: string

  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect?: any

  /**
   * The icon before the label.
   */
  isSelected: boolean

  /**
   * Secondary text shown on the right.
   */
  secondaryText?: React.ReactNode

  /**
   * The default theme only supports one default appearance.
   */
  appearance: string

  /**
   * Set an icon if not
   */
  icon?: any

  onClick?: any
  onKeyPress?: any
}

class MenuOption extends React.PureComponent<MenuOptionProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    isSelected: false,
    onClick: () => {},
    onSelect: () => {},
    onKeyPress: () => {}
  }

  handleClick = e => {
    this.props.onSelect(e)
  }

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props.onSelect(e)
      e.preventDefault()
    }
  }

  render() {
    const {
      id,
      children,
      icon,
      appearance,
      secondaryText,
      isSelected
    } = this.props
    const theme = this.context

    const themedCSS = theme.getMenuItemCSS(appearance, 'none')

    const textProps =
      isSelected || icon
        ? {
            color: 'selected',
            fontWeight: 500,
            marginLeft: 16
          }
        : { marginLeft: 44 }

    const Icon = isSelected ? CheckIcon : icon ? icon : null

    return (
      <Pane
        id={id}
        role="menuitemradio"
        tabIndex={0}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        data-isselectable="true"
        aria-checked={isSelected}
        height={40}
        display="flex"
        alignItems="center"
        css={themedCSS}
      >
        {Icon && (
          <Icon
            aria-hidden
            color="selected"
            marginLeft={16}
            marginRight={-4}
            size={16}
            flexShrink={0}
          />
        )}
        <Text {...textProps} marginRight={16} flex={1}>
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

export default MenuOption
