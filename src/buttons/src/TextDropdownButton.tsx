import * as React from 'react'
import { Text } from '../../typography'
import { Icon } from '../../icon'
import { Spinner } from '../../spinner'
import { ThemeContext } from '../../theme'
import { IconButtonProps } from './IconButton'

class TextDropdownButton extends React.PureComponent<IconButtonProps> {
  public static contextType = ThemeContext
  static defaultProps = {
    isActive: false,
    icon: 'caret-down'
  }

  render() {
    const {
      height,
      isActive,
      children,
      disabled,
      isLoading,

      // Icons
      icon,

      ...props
    } = this.props
    const theme = this.context

    const themedClassName = theme.getTextDropdownButtonClassName()

    return (
      <Text
        is="button"
        className={themedClassName}
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
        {...props}
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
        <Icon color="default" icon={icon} size={12} marginLeft={2} />
      </Text>
    )
  }
}

export default TextDropdownButton
