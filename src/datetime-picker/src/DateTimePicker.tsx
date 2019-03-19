import Box from '@hennessyevan/aluminum-box'
import { format, setHours, setMinutes } from 'date-fns'
import * as React from 'react'
import { PositionEnum } from '../../constants/index'
import { Popover } from '../../popover'
import { TextInput } from '../../text-input'
import { convertHourTo24 } from '../utils/parseTime'
import InlineDatePicker from './InlineDatePicker'
import TimeMenu from './TimeMenu'

const DEFAULT_FORMAT_STRING = 'MMMM Do, YYYY h:mm A'

function defaultDateFormatter(date) {
  return date instanceof Date ? format(date, DEFAULT_FORMAT_STRING) : date
}

interface DateTimePickerProps {
  /**
   * Set an initial day value and/or assume control via this prop
   * @default new Date()
   */
  value: Date
  /**
   * Set a locale
   * @default 'en-CA'
   */
  locale: string
  localeOptions: Partial<Intl.DateTimeFormatOptions>
  disableDates?: (date: Date) => boolean
  onChange?: any
  todayButtonLabel: string
  shouldShowTodayButton: boolean
  shouldShowYearButtons: boolean
  dateFormatter?: any
  mobile?: boolean
  detectMobile?: boolean
  interval: number
  height: string | number
  width?: string | number
  type?: string
  position?: PositionEnum
  isShown: boolean
}

export default class DateTimePicker extends React.Component<
  DateTimePickerProps
> {
  state = {
    selected: format(
      setMinutes(
        this.props.value,
        Math.round(this.props.value.getMinutes() / this.props.interval) *
          this.props.interval
      )!,
      DEFAULT_FORMAT_STRING
    ),
    date: new Date(),
    time: {
      hour: new Date().getHours(),
      minute: new Date().getMinutes()
    },
    isShown: this.props.isShown
  }

  static defaultProps = {
    value: new Date(),
    interval: 5,
    isShown: false,
    width: 'auto',
    height: 320,
    shouldShowTodayButton: true,
    shouldShowYearButtons: true,
    todayButtonLabel: 'Today',
    locale: 'en-US',
    localeOptions: {
      weekday: 'short',
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    }
  }

  onChange = (input, picker) => {
    let selected = input
    if (picker === 'date') {
      selected = setMinutes(
        setHours(input, this.state.time.hour),
        this.state.time.minute
      )
      this.setState({ date: input })
    }
    if (picker === 'time') {
      const hour = convertHourTo24(input.hour, input.meridian)
      selected = setMinutes(setHours(this.state.date, hour), input.minute)
      this.setState({ time: input })
    }
    this.setState({ selected })
    return this.props.onChange(selected)
  }

  close = () => {
    this.setState({ isShown: false })
  }

  render() {
    const {
      value,
      width,
      height,
      interval,
      type,
      position,
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
    const { selected, isShown } = this.state

    return (
      <Popover
        isShown={isShown}
        position={position}
        bringFocusInside
        content={({ close }) => (
          <Box width={width} display="flex">
            <InlineDatePicker
              borderRight="solid 1px #efefef"
              height={height}
              value={value}
              shouldShowTodayButton={shouldShowTodayButton}
              shouldShowYearButtons={shouldShowYearButtons}
              todayButtonLabel={todayButtonLabel}
              locale={locale}
              localeOptions={localeOptions}
              disableDates={disableDates}
              onChange={date => this.onChange(date, 'date')}
            />
            <TimeMenu
              value={value}
              height={height}
              interval={interval}
              onChange={(_, time) => this.onChange(time, 'time')}
              close={close}
            />
          </Box>
        )}
      >
        <TextInput type={type} value={dateFormatter(selected)} {...props} />
      </Popover>
    )
  }
}
