import React from 'react'
import { ThemeConsumer } from './ThemeContext'

function withTheme(WrappedComponent: any) {
  return class extends React.Component {
    render() {
      return (
        <ThemeConsumer>
          {theme => {
            return <WrappedComponent theme={theme} {...this.props} />
          }}
        </ThemeConsumer>
      )
    }
  }
}

export default withTheme
