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
    height: 16,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    borderRadius: 2,
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
        size={300}
        {...Badge.styles}
        color={color}
        backgroundColor={backgroundColor}
        {...props}
      />
    )
  }
}

export default Badge
