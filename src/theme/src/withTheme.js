import React from 'react'
import { ThemeConsumer } from './ThemeContext'

/**
 * HOC that uses ThemeConsumer.
 * @param {React.Component} WrappedComponent - Component that gets theme.
 */
function withTheme(WrappedComponent, themeColor = 'blue') {
  return class extends React.Component {
    render() {
      return (
        <ThemeConsumer>
          {theme => {
            theme.themeColor = themeColor
            return <WrappedComponent theme={theme} {...this.props} />
          }}
        </ThemeConsumer>
      )
    }
  }
}

export default withTheme
