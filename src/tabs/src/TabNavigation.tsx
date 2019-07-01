import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'

export default class TabNavigation extends React.PureComponent<
  BoxProps<'nav'>
> {
  render() {
    return <Box is="nav" role="navigation" {...(this.props as any)} />
  }
}
