import * as React from 'react'
import { Strong } from '../../typography'
import { ThemeContext } from '../../theme'
import { TextProps } from '../../typography/src/Text'

class Badge extends React.PureComponent<TextProps> {
  public static contextType = ThemeContext

  static defaultProps = { color: 'neutral', isSolid: false }

  static styles = {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 17,
    paddingTop: 1,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    borderRadius: 3,
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase'
  }

  render() {
    const { color: propsColor, isSolid, ...props } = this.props
    const theme = this.context

    const { color, backgroundColor } = theme.getBadgeProps({
      isSolid,
      color: propsColor
    })

    return (
      <Strong
        size={200}
        {...Badge.styles}
        color={color}
        backgroundColor={backgroundColor}
        {...props as any}
      />
    )
  }
}

export default Badge
