import * as React from 'react'

import { Pane, PaneProps } from '../../layers'
import { Text } from '../../typography'
import Radio from './Radio'

let radioCount = 1 // Used for generating unique input names

interface Option {
  label: React.ReactNode
  value: string
  isDisabled?: boolean
}

export interface RadioGroupProps extends PaneProps {
  /**
   * The options for the radios of the Radio Group.
   */
  options?: Option[]

  /**
   * The selected item value when controlled.
   */
  value?: string

  /**
   * The default value of the Radio Group when uncontrolled.
   */
  defaultValue?: string

  /**
   * Function called when state changes.
   */
  onChange?: any

  /**
   * Label to display above the radio button options.
   */
  label?: string

  /**
   * The size of the radio circle. This also informs the text size and spacing.
   */
  size?: 12 | 16

  /**
   * When true, the radio get the required attribute.
   */
  isRequired?: boolean
}

interface RadioGroupState {
  value: string
}

export default class RadioGroup extends React.PureComponent<
  RadioGroupProps,
  RadioGroupState
> {
  static defaultProps = {
    options: [],
    onChange: () => {},
    size: 12,
    isRequired: false
  }

  name: any

  state: RadioGroupState = {
    value: this.props.defaultValue || this.props.options![0].value || ''
  }

  constructor(props: RadioGroupProps) {
    super(props)

    this.name = `RadioGroup-${radioCount}`
    radioCount += 1
  }

  handleChange = (value: string) => {
    // Save a render cycle when it's a controlled input
    if (!this.props.value) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    const {
      size,
      label,
      // tslint:disable-next-line:no-unused
      defaultValue,
      value,
      options = [],
      // tslint:disable-next-line:no-unused
      onChange,
      isRequired,
      ...props
    } = this.props

    // Allows it to behave like a controlled input
    const selected = value || this.state.value

    return (
      <Pane role="group" aria-label={label} {...(props as any)}>
        {label && (
          <Text color="muted" fontWeight={500}>
            {label}
          </Text>
        )}
        {options.map(item => (
          <Radio
            key={item.value}
            size={size}
            name={this.name}
            value={item.value}
            label={item.label}
            checked={selected === item.value}
            disabled={item.isDisabled}
            onChange={() => this.handleChange(item.value)}
            isRequired={isRequired}
          />
        ))}
      </Pane>
    )
  }
}
