import * as React from 'react'
import { Omit } from 'utility-types'
import Box, { BoxProps } from '@parishconnect/box'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import { ChevronDownIcon } from '../../icons/index'

export interface SelectProps extends Omit<BoxProps<'div'>, 'appearance'> {
  /**
   * The id attribute for the select.
   */
  id?: string | any

  /**
   * The name attribute for the select.
   */
  name?: string | number

  /**
   * The initial value of an uncontrolled select
   */
  defaultValue?: any

  /**
   * Function called when value changes.
   */
  onChange?: any

  /**
   * The value of the select.
   */
  value?: any

  /**
   * When true, the select is required.
   */
  required?: boolean

  /**
   * When true, the select should auto focus.
   */
  autoFocus?: boolean

  /**
   * When true, the select is invalid.
   */
  isInvalid?: boolean

  /**
   * The appearance of the select. The default theme only supports default.
   */
  appearance?: string
  disabled?: boolean
  height?: number
}

class Select extends React.PureComponent<SelectProps> {
  static contextType = ThemeContext

  static defaultProps = {
    appearance: 'default',
    height: 32
  }

  render() {
    const {
      id,
      name,
      height = 32,
      children,
      defaultValue,
      disabled,
      onChange,
      value,
      required,
      autoFocus,
      isInvalid,
      appearance = 'default',
      ...props
    } = this.props
    const theme = this.context

    const themedClassName = theme.getSelectClassName(
      appearance,
      theme.themeColor
    )
    const textSize = theme.getTextSizeForControlHeight(height)
    const borderRadius = theme.getBorderRadiusForControlHeight(height)
    const iconSize = theme.getIconSizeForSelect(height)
    const iconMargin = height >= 36 ? 12 : 8

    return (
      <Box
        display="inline-flex"
        flex={1}
        position="relative"
        width="auto"
        height={height}
        {...(props as any)}
      >
        <Text
          is="select"
          className={themedClassName}
          id={id}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          aria-invalid={isInvalid}
          size={textSize}
          borderRadius={borderRadius}
          textTransform="initial"
          paddingLeft={Math.round(height / 3.2)}
          // Provide enough space for auto-sizing select including the icon
          paddingRight={iconMargin * 2 + iconSize}
        >
          {children}
        </Text>
        <ChevronDownIcon
          color="default"
          size={iconSize}
          position="absolute"
          top="50%"
          marginTop={-iconSize / 2}
          right={iconMargin}
          pointerEvents="none"
        />
      </Box>
    )
  }
}

export default Select
