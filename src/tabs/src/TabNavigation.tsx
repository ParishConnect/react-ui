import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'

export default class TabNavigation extends React.PureComponent<BoxProps> {
  render() {
    return <Box is="nav" role="navigation" {...this.props} />
  }
}
