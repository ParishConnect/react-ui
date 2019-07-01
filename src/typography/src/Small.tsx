import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'

/**
 * Small can only be used inside of Text or Paragraph.
 */
export default class Small extends React.PureComponent<BoxProps<'small'>> {
  render() {
    return <Box is="small" fontSize="85%" {...(this.props as any)} />
  }
}
