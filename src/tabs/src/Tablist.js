import React, { PureComponent } from 'react'
import Box from '@hennessyevan/aluminum-box'

export default class Tablist extends PureComponent {
  static propTypes = {
    ...Box.propTypes
  }

  render() {
    return <Box role="tablist" {...this.props} />
  }
}
