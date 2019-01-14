import * as React from 'react'
import { ThemeConsumer } from './ThemeContext'
import { ThemeType } from '../../constants'

export interface WithThemeProps {
  theme?: ThemeType
  [prop: string]: any
}

export default function withTheme(
  WrappedComponent:
    | React.ComponentClass<WithThemeProps>
    | React.SFC<WithThemeProps>
) {
  // tslint:disable-next-line:no-unused
  return function ThemedComponent(props: WithThemeProps) {
    return (
      <ThemeConsumer>
        {theme => <WrappedComponent theme={theme} {...props} />}
      </ThemeConsumer>
    )
  }
}
