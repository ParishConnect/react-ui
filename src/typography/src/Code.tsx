import React, { PureComponent } from 'react'
import cx from 'classnames'
import { withTheme } from '../../theme'
import Text, { TextProps } from './Text'
import { ThemeType } from '../../constants'

export type CodeProps = TextProps & {
  /**
   * The appearance of the code.
   */
  appearance: 'default' | 'minimal'
  /**
   * Theme provided by ThemeProvider.
   */
  theme: ThemeType
  /**
   * Class name passed to the button.
   * Only use if you know what you are doing.
   */
  className?: string
}

class Code extends PureComponent<CodeProps> {
  render() {
    const { theme, className, appearance = 'default', ...props } = this.props

    const {
      className: themedClassName = '',
      ...themeProps
    } = theme.getCodeProps(appearance)

    return (
      <Text
        is="code"
        className={cx(className, themedClassName)}
        fontFamily="mono"
        {...themeProps}
        {...props}
      />
    )
  }
}

export default withTheme(Code)
