import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { ListTextSize } from './Shared'

export declare interface OrderedListProps extends BoxProps {
  size?: ListTextSize
}

export default class OrderedList extends React.PureComponent<OrderedListProps> {
  public static defaultProps = {
    size: 400
  }

  render() {
    const { children, size = 400, ...props } = this.props

    const finalChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child
      }

      return React.cloneElement(child as React.ReactElement<any>, {
        // Prefer more granularly defined icon if present
        size
      })
    })

    return (
      <Box
        is="ol"
        margin={0}
        marginLeft="1.1em"
        padding={0}
        listStylePosition="inside"
        listStyle="decimal"
        {...props}
      >
        {finalChildren}
      </Box>
    )
  }
}
