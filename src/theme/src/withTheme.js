import React from 'react'
import { ThemeConsumer } from './ThemeContext'

/**
 * HOC that uses ThemeConsumer.
 * @param {React.Component} WrappedComponent - Component that gets theme.
 */
function withTheme(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <ThemeConsumer>
          {(theme, themeColor) => (
            <WrappedComponent
              theme={{ ...theme, themeColor }}
              {...this.props}
            />
          )}
        </ThemeConsumer>
      )
    }
  }
}

export default withTheme
