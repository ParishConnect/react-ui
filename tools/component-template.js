'use strict'

module.exports = ({ componentName }) => {
  return `
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Box from '@hennessyevan/aluminum-box'

export default class ${componentName} extends PureComponent {
  static propTypes = {}

  render() {
    const { ...props } = this.props

    return <Box {...props}>${componentName}</Box>
  }
}
`.trim()
}
