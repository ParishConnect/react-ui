import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'

export interface ImageProps extends BoxProps {
  src?: string
}

export default class Image extends React.PureComponent<ImageProps> {
  render() {
    return <Box is="img" {...this.props} />
  }
}
