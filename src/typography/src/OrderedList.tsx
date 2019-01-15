import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'

export declare interface OrderedListProps {
  size: 300 | 400 | 500 | 600
}

export default class OrderedList extends React.PureComponent<
  BoxProps & OrderedListProps
> {
  static defaultProps = {
    size: 400
  }

  render() {
    const { children, size, ...props } = this.props

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
