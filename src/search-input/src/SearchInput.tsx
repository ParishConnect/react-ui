import * as React from 'react'
import Box, { splitBoxProps } from '@parishconnect/box'
import { TextInput } from '../../text-input'
import { ThemeContext } from '../../theme'
import { StackingOrder } from '../../constants'
import { TextInputProps } from '../../text-input/src/TextInput'
import { SearchIcon } from '../../icons/index'

class SearchInput extends React.PureComponent<TextInputProps> {
  static contextType = ThemeContext

  static defaultProps = {
    height: 32,
    appearance: 'default'
  }

  render() {
    const {
      appearance = 'default',
      disabled,
      height = 32,
      ...props
    } = this.props
    const theme = this.context
    const { matchedProps, remainingProps } = splitBoxProps(props)
    const { width } = matchedProps
    const iconSize = theme.getIconSizeForInput(height)

    return (
      <Box
        position="relative"
        display="inline-flex"
        height={height}
        {...matchedProps}
      >
        <Box
          height={height}
          width={height}
          pointerEvents="none"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SearchIcon
            color="default"
            zIndex={StackingOrder.FOCUSED + 1}
            size={iconSize}
          />
        </Box>
        <TextInput
          borderRadius={height}
          height={height}
          paddingLeft={height}
          appearance={appearance}
          disable={disabled}
          width={width}
          {...remainingProps}
        />
      </Box>
    )
  }
}

export default SearchInput
