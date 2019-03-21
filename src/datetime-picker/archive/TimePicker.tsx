import { format, getHours, getMinutes } from 'date-fns'
import * as React from 'react'
import { Popover } from '../../popover/index'
import { TextInputField } from '../../text-input/index'
import TimeMenu from '../src/TimeMenu'
import { defaultTimeFormat, defaultTimes } from '../utils/index'
import parseTime from '../utils/parseTime'

interface TimePickerProps {
  /**
   * Time format that is accepted by [date-fns's format function](https://date-fns.org/v1.29.0/docs/format)
   */
  timeFormat: string
  /**
   * Set the breakdown of shown minutes
   * @default 5
   */
  interval: number
  /**
   * Default for `isOpen`.
   */
  defaultIsOpen: boolean
  /**
   * Set times
   */
  times: string[]
  onChange: any
  width?: string | number
  value: string
  label?: string
}

export default class TimePicker extends React.Component<TimePickerProps> {
  ref: any
  input: any
  state = {
    value: this.props.value,
    menuHasFocus: false,
    isOpen: this.props.defaultIsOpen
  }

  static defaultProps = {
    defaultIsOpen: false,
    timeFormat: defaultTimeFormat,
    times: defaultTimes,
    interval: 5,
    value: `${getHours(new Date())}:${Math.round(getMinutes(new Date()) / 5) *
      5}`,
    onChange: () => {}
  }

  onFocus = () => {
    this.setState({ isOpen: true })
  }
  onBlur = () => {
    setTimeout(() => {
      if (this.state.menuHasFocus) return
      this.setState({ isOpen: false })
    }, 500)
  }

  onChange = value => {
    this.setState({ value })
    return this.props.onChange(value)
  }
  close = () => this.setState({ isOpen: false })
  setMenuFocus = () => this.setState({ menuHasFocus: true })

  render() {
    const { width = 200, interval, label } = this.props
    return (
      <Popover
        isShown={this.state.isOpen}
        content={
          <TimeMenu
            onFocus={this.setMenuFocus}
            value={this.state.value}
            width={width}
            interval={interval}
            onChange={this.onChange}
            close={this.close}
          />
        }
      >
        <TextInputField
          width={width}
          label={label}
          readOnly
          value={format(parseTime(this.state.value), 'hh:mm A')}
        />
      </Popover>
    )
  }
}
