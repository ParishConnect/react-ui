import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { ListTextSize } from './Shared'

export interface UnorderedListProps {
  /**
   * Size of the text used in a list item.
   * Can be: 300, 400, 500, 600.
   */
  size?: ListTextSize
  /**
   * When passed, adds a icon before each list item in the list
   * You can override this on a individual list item.
   */
  icon?: IconName
  /**
   * The color of the icon in each list item in the list.
   */
  iconColor?: string
}

export default class UnorderedList extends React.PureComponent<
  BoxProps & UnorderedListProps
> {
  static defaultProps = {
    size: 400
  }

  render() {
    const { children, size = 400, icon, iconColor, ...props } = this.props

    // Only pass down icon-related props if specified
    const inheritedProps = icon ? { size, icon, iconColor } : { size }

    const finalChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child
      }

      return React.cloneElement(child, {
        ...inheritedProps,
        // Prefer more granularly defined icon if present
        ...child.props
      })
    })

    return (
      <Box
        is="ul"
        margin={0}
        marginLeft="1.1em"
        padding={0}
        listStylePosition="inside"
        listStyle="disc"
        {...props}
      >
        {finalChildren}
      </Box>
    )
  }
}
