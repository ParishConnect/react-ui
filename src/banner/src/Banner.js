import React, { PureComponent } from 'react'
import Box from 'ui-box'
import tinyColor from 'tinycolor2'
import PropTypes from 'prop-types'
import Pane from '../../layers/src/Pane'
import Text from '../../typography/src/Text'
import Small from '../../typography/src/Small'
import Icon from '../../icon/src/Icon'
import { withTheme } from '../../theme'

class Banner extends PureComponent {
  static propTypes = {
    ...Pane.propTypes,

    /**
     * Title is the theme colored text and is required
     */
    title: PropTypes.string,

    /**
     * Subtitle appears underneath the title and is optional
     */
    subtitle: PropTypes.string,

    /**
     * One of the tints from background colors
     */
    hoverTint: PropTypes.string,

    /**
     * Add optional icon support for action
     */
    icon: PropTypes.string
  }

  static defaultProps = {
    height: 75,
    width: 325
  }

  getActionDescriptor = (action, color, theme) => {
    if (action.icon) {
      return (
        <Box
          color={color || theme.palette[theme.themeColor].base}
          paddingX={25}
        >
          <Icon icon={action.icon} />
        </Box>
      )
    }
    if (typeof action.title === 'string' || action.title instanceof String) {
      return (
        <Text
          paddingX={25}
          size={400}
          color={color || theme.palette[theme.themeColor].base}
        >
          {action.title}
        </Text>
      )
    }
  }

  getHoverBackgroundStyle = (hoverTint, css) => {
    const { theme } = this.props

    return {
      transitionDuration: '150ms',
      transitionProperty: 'background',
      transitionTimingFunction: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
      ':hover': {
        ...(css[':hover'] || {}),
        background: theme.getBackground(hoverTint)
      },
      ':active': {
        ...(css[':active'] || {}),
        background: `${tinyColor(theme.getBackground(hoverTint)).darken(3)}`
      }
    }
  }

  render() {
    const {
      theme,
      height = 65,
      color,
      children,
      subtitle,
      action,
      hoverTint = 'tint1',
      css = {}
    } = this.props
    const hoverBackground = this.getHoverBackgroundStyle(hoverTint, css)
    return (
      <Pane
        elevation={1}
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius={5}
        {...this.props}
      >
        <Box display="flex" paddingX={25} flexGrow={1} flexDirection="column">
          <Text
            color={color || theme.palette[theme.themeColor].base}
            size={theme.getTextSizeForControlHeight(height || 75)}
          >
            {children}
          </Text>
          <Small>
            <Text size={200}>{subtitle}</Text>
          </Small>
        </Box>
        {action && (
          <Pane
            onClick={() => action.onClick()}
            cursor="pointer"
            width="auto"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            height="100%"
            css={{ ...css, ...hoverBackground }}
          >
            <Box borderLeft="1px solid #efefef" height="65%" />
            {this.getActionDescriptor(action, color, theme)}
          </Pane>
        )}
      </Pane>
    )
  }
}

export default withTheme(Banner)
