import * as React from 'react'
import { noop } from 'lodash'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { scales } from '../../theme/src/default-theme/foundational-styles'
import SegmentedControlRadio from './SegmentedControlRadio'

let radioCount = 1 // Used for generating unique input names

interface ControlOptions {
  label: React.ReactNode
  value?: number | string | boolean
}

export interface SegmentedControlProps extends BoxProps {
  /**
   * The options for the radios of the Segmented Control.
   */
  options: ControlOptions[]
  /**
   * The current value of the Segmented Control when controlled.
   */
  value?: number | string | boolean
  /**
   * The default value of the Segmented Control when uncontrolled.
   */
  defaultValue?: number | string | boolean
  /**
   * The name of the radio group.
   */
  name?: string
  /**
   * The height of the Segmented Control.
   */
  height?: number
  /**
   * Function called when the value changes.
   */
  onChange?: any
}

interface SegmentedControlState {
  value?: number | string | boolean
}

export default class SegmentedControl extends React.PureComponent<
  SegmentedControlProps,
  SegmentedControlState
> {
  static defaultProps = {
    height: 32
  }

  name: string

  state: SegmentedControlState = {
    value: this.props.defaultValue
  }

  constructor(props: SegmentedControlProps) {
    super(props)

    let value = props.defaultValue
    if (typeof value === 'undefined' || value === null) {
      value = props.options[0].value
    }

    this.name = `SegmentedControl-${radioCount}`
    radioCount += 1
  }

  isControlled = () => {
    return typeof this.props.value !== 'undefined' && this.props.value !== null
  }

  handleChange = (value: number | string | boolean) => {
    // Save a render cycle when it's a controlled input
    if (!this.isControlled()) {
      this.setState({ value })
    }

    if (typeof this.props.onChange === 'function') {
      const { onChange = noop } = this.props
      onChange(value)
    }
  }

  render() {
    const {
      // tslint:disable-next-line:no-unused
      value: filterOutValue, // Filter out.
      name,
      height = 32,
      options,
      ...props
    } = this.props

    // Allows it to behave like a controlled input
    let value = this.state.value
    if (this.isControlled()) {
      value = this.props.value
    }

    return (
      <Box
        display="flex"
        backgroundColor={scales.neutral.N5}
        borderRadius={999}
        marginRight={-1}
        height={height}
        {...props}
      >
        {options.map((option, index) => {
          return (
            <SegmentedControlRadio
              key={String(option.value)}
              id={this.name + index}
              name={name || this.name}
              label={option.label}
              value={String(option.value)}
              height={height}
              checked={value === option.value}
              onChange={this.handleChange.bind(null, option.value)}
              appearance="default"
              isFirstItem={index === 0}
              isLastItem={index === options.length - 1}
            />
          )
        })}
      </Box>
    )
  }
}
