import * as React from 'react'
import Text from './Text'
import { PaneProps } from '../../layers/src/Pane'
import { Overwrite } from 'utility-types'

export declare interface ListItemProps {
  /**
   * When passed, adds a icon before the list item.
   * See Evergreen `Icon` for documentation.
   */
  icon?: any
  size?: 300 | 400 | 500 | 600
  /**
   * The color of the icon.
   */
  iconColor?: string
}

export default class ListItem extends React.PureComponent<
  Overwrite<PaneProps, ListItemProps>
> {
  public static defaultProps = {
    size: 400
  }
  render() {
    const { children, size, icon: Icon, iconColor, ...props } = this.props

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
        listStyleType={Icon ? 'none' : undefined}
        paddingLeft={Icon ? paddingLeft : undefined}
        {...props}
      >
        {Icon && (
          <Icon
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
