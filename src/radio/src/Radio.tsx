import * as React from 'react'

import { Omit } from 'utility-types'
import Box, { BoxProps } from '@parishconnect/box'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'

const CircleIcon = ({
  size,
  fill = 'currentColor',
  ...props
}: {
  size?: number
  fill?: string
}) => (
  <svg width={size} height={size} viewBox="0 0 10 10" {...(props as any)}>
    <circle fill={fill} cx="5" cy="5" r="5" />
  </svg>
)

export interface RadioProps extends Omit<BoxProps, 'appearance'> {
  /**
   * The id attribute of the radio.
   */
  id?: string

  /**
   * The name attribute of the radio.
   */
  name?: string

  /**
   * Label of the radio.
   */
  label?: React.ReactNode

  /**
   * The value attribute of the radio.
   */
  value?: string

  /**
   * Function called when state changes.
   */
  onChange?: any

  /**
   * When true, the radio is disabled.
   */
  disabled?: boolean

  /**
   * When true, the radio is checked.
   */
  checked?: boolean

  /**
   * The size of the radio circle. This also informs the text size and spacing.
   */
  size?: 12 | 16

  /**
   * When true, the radio get the required attribute.
   */
  isRequired?: boolean

  /**
   * When true, the aria-invalid attribute is true.
   * Used for accessibility.
   */
  isInvalid?: boolean

  /**
   * The appearance of the checkbox.
   * The default theme only comes with a default style.
   */
  appearance?: string
}

class Radio extends React.PureComponent<RadioProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    onChange: () => {},
    size: 12,
    isRequired: false,
    isInvalid: false
  }

  render() {
    const {
      id,
      name,
      label,
      disabled,
      isInvalid,
      checked,
      onChange,
      value,
      size,
      isRequired,
      // tslint:disable-next-line:no-unused
      appearance,
      ...props
    } = this.props
    const theme = this.context
    const themedCSS = theme.getRadioCSS(theme.themeColor)

    return (
      <Box
        is="label"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        position="relative"
        display="flex"
        marginY={size === 12 ? 8 : 12}
        {...(props as any)}
      >
        <Box
          is="input"
          css={themedCSS}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={isInvalid}
          required={isRequired}
        />
        <Box
          boxSizing="border-box"
          borderRadius={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={2}
          width={size}
          height={size}
        >
          <CircleIcon size={size === 12 ? 4 : 4} />
        </Box>
        {label && (
          <Text
            marginLeft={size === 12 ? 8 : 10}
            size={size === 12 ? 300 : 400}
            color={disabled ? 'muted' : 'default'}
          >
            {label}
          </Text>
        )}
      </Box>
    )
  }
}

export default Radio
