import * as React from 'react'
import { Popover } from '../../popover'
import { TextInput } from '../../text-input'
import InlineDatePicker, { InlineDatePickerProps } from './InlineDatePicker'

function defaultDateFormatter(date) {
  return date instanceof Date ? date.toDateString() : date
}

export default class DatePicker extends React.Component<InlineDatePickerProps> {
  state = {
    selected: this.props.value!.toDateString()
  }
  static defaultProps = {
    value: new Date()
  }

  onChange = date => {
    this.setState({ selected: date })
    return this.props.onChange
  }

  render() {
    const { selected } = this.state
    const {
      value,
      shouldShowTodayButton,
      shouldShowYearButtons,
      todayButtonLabel,
      locale,
      localeOptions,
      disableDates,
      onChange,
      mobile,
      dateFormatter = defaultDateFormatter,
      ...props
    } = this.props

    return (
      <Popover
        bringFocusInside
        content={
          <InlineDatePicker
            value={value}
            shouldShowTodayButton={shouldShowTodayButton}
            shouldShowYearButtons={shouldShowYearButtons}
            todayButtonLabel={todayButtonLabel}
            locale={locale}
            localeOptions={localeOptions}
            disableDates={disableDates}
            onChange={this.onChange}
          />
        }
      >
        <TextInput value={dateFormatter(selected)} {...props} />
      </Popover>
    )
  }
}
