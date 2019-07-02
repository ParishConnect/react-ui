import * as React from 'react'
import { Pane } from '../../layers'
import { Paragraph } from '../../typography'
import { ThemeContext } from '../../theme'
import { BoxProps } from '@parishconnect/box'

export interface TooltipStatelessProps extends Omit<BoxProps, 'appearance'> {
  /**
   * The appearance of the tooltip.
   */
  appearance?: 'default' | 'card'
}

class TooltipStateless extends React.PureComponent<TooltipStatelessProps> {
  static contextType = ThemeContext

  render() {
    const { children, appearance, ...props } = this.props
    const theme = this.context
    const { color, ...themedProps } = theme.getTooltipProps(appearance)

    let child: any
    if (typeof children === 'string') {
      child = (
        <Paragraph color={color} size={400}>
          {children}
        </Paragraph>
      )
    } else {
      child = children
    }

    return (
      <Pane
        borderRadius={3}
        paddingX={8}
        paddingY={4}
        maxWidth={240}
        {...themedProps}
        {...(props as any)}
      >
        {child}
      </Pane>
    )
  }
}

export default TooltipStateless
