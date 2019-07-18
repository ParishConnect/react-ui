import * as React from 'react'
import { Omit } from 'utility-types'
import { ThemeContext } from '../../theme'
import Text, { TextProps } from './Text'

export interface CodeProps extends Omit<TextProps, 'appearance'> {
  /**
   * The appearance of the code.
   */
  appearance?: 'default' | 'minimal'
}

class Code extends React.PureComponent<CodeProps> {
  public static contextType = ThemeContext
  public static defaultProps = {
    appearance: 'default'
  }
  render() {
    const { css, appearance = 'default', ...props } = this.props
    const theme = this.context

    const { css: themedCSS = null, ...themeProps } = theme.getCodeProps(
      appearance
    )

    return (
      <Text
        is="code"
        css={{ ...themedCSS, ...css }}
        fontFamily="mono"
        {...themeProps}
        {...props}
      />
    )
  }
}

export default Code
