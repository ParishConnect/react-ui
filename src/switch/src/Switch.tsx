import * as React from 'react'
import { Omit } from 'utility-types'

import tinycolor from 'tinycolor2'
import PropTypes from 'prop-types'
import Box, { BoxProps } from '@parishconnect/box'
import { ThemeContext } from '../../theme'

const animationEasing = {
  spring: `cubic-bezier(0.175, 0.885, 0.320, 1.175)`
}

const handleStyle = {
  backgroundColor: '#fff',
  borderRadius: 9999
}

const iconContainerStyle = {
  transition: `all 500ms ${animationEasing.spring}`,
  opacity: 0,
  transform: 'scale(0.0)',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 4,
  '&[data-checked="true"]': {
    opacity: 1,
    transform: 'scale(1)'
  }
}

const handleContainerStyle = {
  transition: 'transform 200ms ease-in-out',
  transform: 'translateX(0%)',
  '&[data-checked="true"]': {
    transform: 'translateX(50%)'
  }
}

const CheckIcon = ({ size, fill = 'currentColor', ...props }) => (
  <svg width={10} height={size} viewBox="0 0 10 7" {...(props as any)}>
    <path
      fill={fill}
      fillRule="evenodd"
      d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
    />
  </svg>
)

CheckIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number
}

const isControlled = component => {
  return {}.hasOwnProperty.call(component.props, 'checked')
}

export interface SwitchProps extends Omit<BoxProps, 'appearance'> {
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
   * The height of the switch.
   */
  height?: number

  /**
   * When true, the switch is checked (on).
   */
  checked?: boolean

  /**
   * Function called when state changes.
   */
  onChange?: any

  /**
   * When true, the switch is disabled.
   */
  disabled?: boolean

  /**
   * When true, the switch is invalid.
   */
  isInvalid?: boolean

  /**
   * The appearance of the checkbox.
   * The default theme only comes with a default style.
   */
  appearance?: string

  /**
   * When true, the switch has a check icon.
   */
  hasCheckIcon?: boolean

  /**
   * When true, the switch is true by default.
   * This is for uncontrolled usage.
   */
  defaultChecked?: boolean
}

interface SwitchState {
  checked: boolean
}

class Switch extends React.PureComponent<SwitchProps, SwitchState> {
  static contextType = ThemeContext

  static defaultProps = {
    height: 16,
    onChange: () => {},
    appearance: 'default',
    hasCheckIcon: true,
    disabled: false
  }

  state: SwitchState = {
    checked: this.props.checked || this.props.defaultChecked || false
  }

  handleChange = value => {
    if (isControlled(this)) {
      this.props.onChange(value)
    } else {
      this.setState({
        checked: !this.state.checked
      })
      this.props.onChange(value)
    }
  }

  render() {
    // tslint:disable:no-unused
    const {
      id,
      name,
      height = 16,
      checked: checkedProps,
      onChange = () => {},
      disabled = false,
      appearance = 'default',
      hasCheckIcon = true,
      defaultChecked,
      ...props
    } = this.props
    // tslint:enable:no-unused
    const theme = this.context

    const checked = isControlled(this) ? checkedProps : this.state.checked
    const themedCSS = theme.getSwitchCSS(theme.themeColor)

    return (
      <Box is="label" display="block" width={height * 2} {...(props as any)}>
        <Box
          is="input"
          css={themedCSS}
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          defaultChecked={defaultChecked}
          onChange={this.handleChange}
        />
        <Box height={height} width={height * 2}>
          <Box
            height={height}
            width={height}
            data-checked={checked}
            css={iconContainerStyle as any}
          >
            {hasCheckIcon && (
              <CheckIcon
                fill={
                  theme.palette[theme.themeColor]
                    ? tinycolor(theme.palette[theme.themeColor]).isLight()
                      ? theme.scales.neutral.N7
                      : 'currentColor'
                    : 'currentColor'
                }
                size={height / 2 - 3}
              />
            )}
          </Box>
          <Box
            width={height * 2}
            display="flex"
            data-checked={checked}
            css={handleContainerStyle}
          >
            <Box flex={1} padding={2}>
              <Box width={height - 4} height={height - 4} css={handleStyle} />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Switch
