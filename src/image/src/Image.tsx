import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'

export interface ImageProps extends BoxProps {
  src?: string
}

export default class Image extends React.PureComponent<ImageProps> {
  render() {
    return <Box is="img" {...this.props} />
  }
}
