import Box, { splitBoxProps } from '@hennessyevan/aluminum-box'
import { format, startOfMinute } from 'date-fns'
import { DateTime } from 'luxon'
import * as React from 'react'
import { IconButton } from '../../buttons/index'
import { PositionEnum } from '../../constants/index'
import { FormField } from '../../form-field/index'
import { XIcon } from '../../icons/index'
import { Pane } from '../../layers/index'
import { Popover } from '../../popover'
import { TextInput } from '../../text-input'
import { Heading } from '../../typography/index'
import { TimePicker } from '../index'
import InlineDatePicker from './InlineDatePicker'

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
   * Whether to show arrows buttons for changing the time.
   * @default false
   */
  showArrowButtons?: boolean

  /**
   * Whether to use a 12 hour format with an AM/PM dropdown.
   * @default false
   */
  useAmPm?: boolean
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
  /**
   * The name of the text input
   */
  name?: string
  locale: string
  localeOptions: Partial<Intl.DateTimeFormatOptions>
  disableDates?: (date: Date) => boolean
  onChange?: any
  todayButtonLabel: string
  shouldShowTodayButton: boolean
  shouldShowYearButtons: boolean
  dateFormatter?: any
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
    value: this.props.value,
    isShown: this.props.isShown
  }

  static defaultProps = {
    value: startOfMinute(new Date()),
    interval: 5,
    isShown: true,
    width: 'auto',
    height: 320,
    shouldShowTodayButton: true,
    shouldShowYearButtons: true,
    todayButtonLabel: 'Today',
    label: 'Pick a time',
    locale: 'en-US',
    localeOptions: {
      weekday: 'short',
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    }
  }

  onChange = (input: Date, picker: 'date' | 'time') => {
    const oldDate = this.state.value
    let newDate = input
    if (picker === 'date') {
      const { year, month, day } = DateTime.fromJSDate(newDate).toObject()
      newDate = DateTime.fromJSDate(oldDate)
        .set({ year, month, day })
        .toJSDate()
    } else if (picker === 'time') {
      const { hour, minute } = DateTime.fromJSDate(newDate).toObject()
      newDate = DateTime.fromJSDate(oldDate)
        .set({ hour, minute })
        .toJSDate()
    }
    this.setState({ value: newDate })
    return this.props.onChange(newDate)
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
      useAmPm,
      showArrowButtons,
      dateFormatter = defaultDateFormatter,
      ...props
    } = this.props
    const { isShown } = this.state
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
            <Box>
              <Pane
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                borderBottom
                paddingY={4}
                paddingX={8}
              >
                <Heading marginLeft={8} size={400}>
                  Pick a Time
                </Heading>
                <IconButton onClick={close} appearance="minimal" icon={XIcon} />
              </Pane>
              <TimePicker
                margin={16}
                onChange={time => this.onChange(time, 'time')}
                useAmPm={useAmPm}
                showArrowButtons={showArrowButtons}
                value={value}
              />
            </Box>
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
            value={dateFormatter(value)}
            {...remainingProps}
          />
        </FormField>
      </Popover>
    )
  }
}
