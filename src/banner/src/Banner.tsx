import * as React from 'react'
import tinycolor from 'tinycolor2'
import Box from '@parishconnect/box'
import Pane, { PaneProps } from '../../layers/src/Pane'
import Text from '../../typography/src/Text'
import Small from '../../typography/src/Small'
import { ThemeContext } from '../../theme'
import { BackgroundTint } from '../../constants'

interface ActionType {
  title?: string
  icon?: any
  onClick?(): void
}

export interface BannerProps extends PaneProps {
  /**
   * The action attached to the banner and its title. Passed as a function (optional)
   */
  action?: ActionType
  /**
   * Subtitle appears underneath the title and is optional
   */
  subtitle?: string
  /**
   * One of the tints from background colors
   */
  hoverTint?: BackgroundTint
}

class Banner extends React.PureComponent<BannerProps> {
  public static contextType = ThemeContext

  static defaultProps = {
    height: 75,
    minWidth: 325
  }

  getActionDescriptor = (action: ActionType, color: string) => {
    const theme = this.context
    const RenderIcon = action.icon
    if (RenderIcon) {
      return (
        <Box
          color={color || theme.palette[theme.themeColor].base}
          paddingX={25}
        >
          <RenderIcon />
        </Box>
      )
    }
    if (typeof action.title === 'string') {
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
    return ''
  }

  getHoverBackgroundStyle = (hoverTint: BackgroundTint, css = {}) => {
    const theme = this.context

    return {
      transitionDuration: '150ms',
      transitionProperty: 'background',
      transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      ':hover': {
        ...(css[':hover'] || {}),
        background: theme.getBackground(hoverTint)
      },
      ':active': {
        ...(css[':active'] || {}),
        background: `${tinycolor(theme.getBackground(hoverTint)).darken(3)}`
      }
    }
  }

  render() {
    const {
      height = 65,
      color,
      children,
      subtitle,
      action,
      hoverTint = 'tint1',
      css = {}
    } = this.props
    const theme = this.context

    const hoverBackground = this.getHoverBackgroundStyle(hoverTint, css)

    return (
      <Pane
        elevation={1}
        display="inline-flex"
        maxWidth={500}
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius={5}
        {...(this.props as any)}
      >
        <Box display="flex" paddingX={25} flexGrow={1} flexDirection="column">
          <Text
            maxWidth={350}
            textOverflow="ellipsis"
            overflowX="hidden"
            color={color || theme.palette[theme.themeColor].base}
            size={theme.getTextSizeForBlockHeight(height || 75)}
          >
            {children}
          </Text>
          <Small maxWidth={350} textOverflow="ellipsis" overflowX="hidden">
            <Text size={300}>{subtitle}</Text>
          </Small>
        </Box>
        {action && (
          <Pane
            onClick={action.onClick}
            cursor="pointer"
            width="auto"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            height="100%"
            css={{ ...css, ...hoverBackground }}
          >
            <Box borderLeft="1px solid #efefef" height="65%" />
            {this.getActionDescriptor(action, color as any)}
          </Pane>
        )}
      </Pane>
    )
  }
}

export default Banner
