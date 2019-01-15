import * as React from 'react'
import { Icon } from '../../icon'
import Text from './Text'
import { PaneProps } from '../../layers'

export declare interface ListItemProps {
  /**
   * When passed, adds a icon before the list item.
   * See Evergreen `Icon` for documentation.
   */
  icon?: string
  /**
   * The color of the icon.
   */
  iconColor?: string
}

export default class ListItem extends React.PureComponent<
  PaneProps & ListItemProps
> {
  render() {
    const { children, size, icon, iconColor, ...props } = this.props

    let paddingLeft: number
    let iconTop: number
    let iconSize: number
    let iconLeft: number
    switch (size) {
      case 300:
        paddingLeft = 4
        iconTop = 1
        iconSize = 12
        break
      case 400:
        paddingLeft = 8
        iconTop = 2
        iconSize = 14
        break
      case 500:
        paddingLeft = 8
        iconTop = 3
        iconSize = 14
        break
      case 600:
        paddingLeft = 12
        iconTop = 4
        iconSize = 16
        break
      default:
        return
    }

    iconLeft = -iconSize - 4
    if (size === 600) iconLeft = -iconSize

    return (
      <Text
        is="li"
        position="relative"
        marginY="0.5em"
        size={size}
        listStyleType={icon ? 'none' : undefined}
        paddingLeft={icon ? paddingLeft : undefined}
        {...props}
      >
        {icon && (
          <Icon
            icon={icon}
            color={iconColor}
            position="absolute"
            size={iconSize}
            left={iconLeft}
            top={iconTop}
          />
        )}
        {children}
      </Text>
    )
  }
}
