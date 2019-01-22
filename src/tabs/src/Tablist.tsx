import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'

export default class Tablist extends React.PureComponent<BoxProps> {
  render() {
    return <Box role="tablist" {...this.props} />
  }
}
