import Box, { splitBoxProps } from '@hennessyevan/aluminum-box'
import { format, setHours, setMinutes } from 'date-fns'
import * as React from 'react'
import { PositionEnum } from '../../constants/index'
import { FormField } from '../../form-field/index'
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
  id?: string
  /**
   * Makes the input element required.
   */
  required?: boolean
  /**
   * Makes the input element disabled.
   */
  disabled?: boolean
  /**
   * Sets visual styling to be invalid.
   */
  isInvalid?: boolean
  /**
   * Use the native spell check functionality of the browser.
   */
  spellCheck?: boolean
  /**
   * The placeholder text when there is no value present.
   */
  placeholder?: string
  /**
   * The appearance of the TextInput.
   */
  appearance?: string
  /**
   * Class name passed to the button.
   * Only use if you know what you are doing.
   */
  className?: string
  /**
   * Passed on the label as a htmlFor prop.
   */
  labelFor?: string
  /**
   * The label used above the input element.
   */
  label?: React.ReactNode
  /**
   * Wether or not show a asterix after the label.
   */
  isRequired?: boolean
  /**
   * A optional description of the field under the label, above the input element.
   */
  description?: React.ReactNode
  /**
   * A optional hint under the input element.
   */
  hint?: React.ReactNode
  /**
   * If a validation message is passed it is shown under the input element
   * and above the hint.
   */
  validationMessage?: React.ReactNode
  /**
   * The height of the input element.
   */
  inputHeight?: number
  /**
   * The width of the input width.
   */
  inputWidth?: number | string
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
      id,
      inputWidth,
      inputHeight,
      disabled,
      required,
      isInvalid,
      appearance,
      placeholder,
      spellCheck,
      label,
      description,
      validationMessage,
      hint,
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
    const { matchedProps, remainingProps } = splitBoxProps(props)

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
        <FormField
          marginBottom={24}
          label={label}
          isRequired={required}
          hint={hint}
          description={description}
          validationMessage={validationMessage}
          labelFor={id}
          {...matchedProps}
        >
          <TextInput
            id={id}
            width={inputWidth}
            height={inputHeight}
            disabled={disabled}
            required={required}
            isInvalid={isInvalid}
            appearance={appearance}
            placeholder={placeholder}
            spellCheck={spellCheck}
            type={type}
            value={dateFormatter(selected)}
            {...remainingProps}
          />
        </FormField>
      </Popover>
    )
  }
}
