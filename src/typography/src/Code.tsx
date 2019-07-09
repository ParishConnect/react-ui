import { ClassNames } from '@emotion/core'
import * as React from 'react'
import { Omit } from 'utility-types'
import { ThemeContext } from '../../theme'
import Text, { TextProps } from './Text'

export interface CodeProps extends Omit<TextProps, 'appearance'> {
  /**
   * The appearance of the code.
   */
  appearance?: 'default' | 'minimal'
  /**
   * Class name passed to the button.
   * Only use if you know what you are doing.
   */
  className?: string
}

class Code extends React.PureComponent<CodeProps> {
  public static contextType = ThemeContext
  public static defaultProps = {
    appearance: 'default'
  }
  render() {
    const { className, appearance = 'default', ...props } = this.props
    const theme = this.context

    const {
      className: themedClassName = '',
      ...themeProps
    } = theme.getCodeProps(appearance)

    return (
      <ClassNames>
        {({ cx }) => (
          <Text
            is="code"
            className={cx(className, themedClassName)}
            fontFamily="mono"
            {...themeProps}
            {...props}
          />
        )}
      </ClassNames>
    )
  }
}

export default Code
