import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'

export default class Tablist extends React.PureComponent<BoxProps<'li'>> {
  render() {
    return <Box role="tablist" {...(this.props as any)} />
  }
}
