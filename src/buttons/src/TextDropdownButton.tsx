import * as React from 'react'
import { ChevronDownIcon } from '../../icons/'
import { Spinner } from '../../spinner'
import { ThemeContext } from '../../theme'
import { Text } from '../../typography'
import { IconButtonProps } from './IconButton'

class TextDropdownButton extends React.PureComponent<IconButtonProps> {
  public static contextType = ThemeContext
  static defaultProps = {
    isActive: false,
    icon: ChevronDownIcon
  }

  render() {
    const {
      height = 32,
      isActive,
      children,
      disabled,
      isLoading,
      css,

      // Icons
      icon: Icon,

      ...props
    } = this.props
    const theme = this.context

    const themedCSS = theme.getTextDropdownButtonCSS()

    return (
      <Text
        is="button"
        paddingX={4}
        marginX={-4}
        paddingY={2}
        marginY={-2}
        size={300}
        data-active={isActive}
        position="relative"
        fontFamily="ui"
        fontWeight={500}
        display="inline-flex"
        alignItems="center"
        flexWrap="nowrap"
        css={{ ...themedCSS, ...css }}
        {...(props as any)}
        disabled={disabled}
      >
        {isLoading && (
          <Spinner
            marginLeft={-Math.round(height / 8)}
            marginRight={Math.round(height / 4)}
            size={Math.round(height / 2)}
          />
        )}
        {children}
        <Icon color="default" size={12} marginLeft={2} />
      </Text>
    )
  }
}

export default TextDropdownButton
