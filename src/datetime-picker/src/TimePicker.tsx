import Box, { splitBoxProps } from '@hennessyevan/aluminum-box'
import * as React from 'react'
import { IconButton } from '../../buttons/index'
import { FormField } from '../../form-field/index'
import { ChevronDownIcon, ChevronUpIcon } from '../../icons/index'
import { Select } from '../../select/index'
import { TextInput } from '../../text-input/index'
import { ThemeContext } from '../../theme/index'
import * as DateUtils from './common/dateUtils'
import {
  getDefaultMaxTime,
  getDefaultMinTime,
  getTimeUnit,
  isTimeUnitValid,
  setTimeUnit,
  TimeUnit,
  wrapTimeAtUnit
} from './common/timeUnit'
import * as Utils from '../../utils/utils'

const Keys = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
}

export const TimePrecision = {
  MILLISECOND: 'millisecond' as 'millisecond',
  MINUTE: 'minute' as 'minute',
  SECOND: 'second' as 'second'
}
export type TimePrecision = typeof TimePrecision[keyof typeof TimePrecision]

export interface ITimePickerProps {
  /**
   * Width of each input segment
   * @default 48
   */
  inputWidth?: number | string
  /**
   * Appearance of the input
   * @default 'muted'
   */
  appearance?: string
  /**
   * The label used above the input element.
   */
  label?: React.ReactNode
  /**
   * Passed on the label as a htmlFor prop.
   */
  id?: string
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
   * Initial time the `TimePicker` will display.
   * This should not be set if `value` is set.
   */
  defaultValue?: Date

  /**
   * Whether the time picker is non-interactive.
   * @default false
   */
  disabled?: boolean

  /**
   * Callback invoked when the user changes the time.
   */
  onChange?: (newTime: Date) => void

  /**
   * The precision of time the user can set.
   * @default TimePrecision.MINUTE
   */
  precision?: TimePrecision

  /**
   * Whether all the text in each input should be selected on focus.
   * @default false
   */
  selectAllOnFocus?: boolean

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
   * The latest time the user can select. The year, month, and day parts of the `Date` object are ignored.
   * While the `maxTime` will be later than the `minTime` in the basic case,
   * it is also allowed to be earlier than the `minTime`.
   * This is useful, for example, to express a time range that extends before and after midnight.
   * If the `maxTime` and `minTime` are equal, then the valid time range is constrained to only that one value.
   */
  maxTime?: Date

  /**
   * The earliest time the user can select. The year, month, and day parts of the `Date` object are ignored.
   * While the `minTime` will be earlier than the `maxTime` in the basic case,
   * it is also allowed to be later than the `maxTime`.
   * This is useful, for example, to express a time range that extends before and after midnight.
   * If the `maxTime` and `minTime` are equal, then the valid time range is constrained to only that one value.
   */
  minTime?: Date

  /**
   * The currently set time.
   * If this prop is provided, the component acts in a controlled manner.
   */
  value?: Date

  [key: string]: any
}

export interface ITimePickerState {
  hourText?: string
  minuteText?: string
  secondText?: string
  millisecondText?: string
  value?: Date
  isPm?: boolean
}

export default class InlineTimePicker extends React.Component<
  ITimePickerProps,
  ITimePickerState
> {
  public static contextType = ThemeContext
  public static defaultProps: ITimePickerProps = {
    label: '',
    inputWidth: 48,
    disabled: false,
    maxTime: getDefaultMaxTime(),
    minTime: getDefaultMinTime(),
    precision: TimePrecision.MINUTE,
    selectAllOnFocus: false,
    showArrowButtons: false,
    useAmPm: false
  }

  public constructor(props?: ITimePickerProps, context?: any) {
    super(props!, context)

    let value = props!.minTime
    if (props!.value != null) {
      value = props!.value
    } else if (props!.defaultValue != null) {
      value = props!.defaultValue
    }

    this.state = this.getFullStateFromValue(value!, props!.useAmPm!)
  }

  public render() {
    const {
      appearance = 'default',
      label,
      isRequired,
      hint,
      description,
      validationMessage,
      id,
      ...props
    } = this.props
    const shouldRenderMilliseconds =
      this.props.precision === TimePrecision.MILLISECOND
    const shouldRenderSeconds =
      shouldRenderMilliseconds || this.props.precision === TimePrecision.SECOND
    const hourUnit = this.props.useAmPm ? TimeUnit.HOUR_12 : TimeUnit.HOUR_24

    /**
     * Split the wrapper props from the input props.
     */
    const { matchedProps } = splitBoxProps(props)
    const theme = this.context
    const themedClassName = theme.getTextInputClassName(
      appearance,
      theme.themeColor
    )
    const borderRadius = theme.getBorderRadiusForControlHeight(32)

    /* tslint:disable:max-line-length */
    return (
      <FormField
        marginBottom={24}
        label={label}
        isRequired={isRequired}
        hint={hint}
        description={description}
        validationMessage={validationMessage}
        labelFor={id}
        {...matchedProps}
      >
        <Box>
          {this.maybeRenderArrowButton(true, hourUnit)}
          {this.maybeRenderArrowButton(true, TimeUnit.MINUTE)}
          {shouldRenderSeconds &&
            this.maybeRenderArrowButton(true, TimeUnit.SECOND)}
          {shouldRenderMilliseconds &&
            this.maybeRenderArrowButton(true, TimeUnit.MS)}
        </Box>
        <Box
          borderRadius={borderRadius}
          display="inline-block"
          background="white"
          className={themedClassName}
        >
          {this.renderInput(hourUnit, this.state.hourText!)}
          {this.renderDivider()}
          {this.renderInput(TimeUnit.MINUTE, this.state.minuteText!)}
          {shouldRenderSeconds && this.renderDivider()}
          {shouldRenderSeconds &&
            this.renderInput(TimeUnit.SECOND, this.state.secondText!)}
          {shouldRenderMilliseconds && this.renderDivider('.')}
          {shouldRenderMilliseconds &&
            this.renderInput(TimeUnit.MS, this.state.millisecondText!)}
        </Box>
        {this.maybeRenderAmPm()}
        <Box>
          {this.maybeRenderArrowButton(false, hourUnit)}
          {this.maybeRenderArrowButton(false, TimeUnit.MINUTE)}
          {shouldRenderSeconds &&
            this.maybeRenderArrowButton(false, TimeUnit.SECOND)}
          {shouldRenderMilliseconds &&
            this.maybeRenderArrowButton(false, TimeUnit.MS)}
        </Box>
      </FormField>
    )
    /* tslint:enable:max-line-length */
  }

  public componentWillReceiveProps(nextProps: ITimePickerProps) {
    const didMinTimeChange = nextProps.minTime !== this.props.minTime
    const didMaxTimeChange = nextProps.maxTime !== this.props.maxTime
    const didBoundsChange = didMinTimeChange || didMaxTimeChange

    let value = this.state.value
    if (didBoundsChange) {
      value = DateUtils.getTimeInRange(
        this.state.value!,
        nextProps.minTime!,
        nextProps.maxTime!
      )
    }
    if (
      nextProps.value != null &&
      !DateUtils.areSameTime(nextProps.value, this.props.value!)
    ) {
      value = nextProps.value
    }

    this.setState(this.getFullStateFromValue(value!, nextProps.useAmPm!))
  }

  // begin method definitions: rendering

  private maybeRenderArrowButton(isDirectionUp: boolean, timeUnit: TimeUnit) {
    const width = this.props.inputWidth
    if (!this.props.showArrowButtons) {
      return null
    }
    const onClick = () =>
      (isDirectionUp ? this.incrementTime : this.decrementTime)(timeUnit)
    return (
      <IconButton
        type="button"
        appearance="minimal"
        display="inline-block"
        height={24}
        textAlign="center"
        onClick={onClick}
        cursor="pointer"
        css={{
          width: width,
          ':not(:first-child)': {
            marginLeft: 4
          }
        }}
        icon={isDirectionUp ? ChevronUpIcon : ChevronDownIcon}
      />
    )
  }

  private renderDivider(text = ':') {
    return (
      <Box is="span" width={4}>
        {text}
      </Box>
    )
  }

  private renderInput(unit: TimeUnit, value: string) {
    const width = this.props.inputWidth
    return (
      <TextInput
        textAlign="center"
        width={width}
        onBlur={this.getInputBlurHandler(unit)}
        onChange={this.getInputChangeHandler(unit)}
        onFocus={this.handleFocus}
        onKeyDown={this.getInputKeyDownHandler(unit)}
        value={value}
        disabled={this.props.disabled}
        css={{ boxShadow: 'none', background: 'transparent' }}
      />
    )
  }

  private maybeRenderAmPm() {
    if (!this.props.useAmPm) {
      return null
    }
    return (
      <Select
        marginLeft={8}
        width={56}
        disabled={this.props.disabled}
        onChange={this.handleAmPmChange}
        value={this.state.isPm ? 'pm' : 'am'}
      >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </Select>
    )
  }

  // begin method definitions: event handlers

  private getInputBlurHandler = (unit: TimeUnit) => (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const text = getStringValueFromInputEvent(e)
    this.updateTime(parseInt(text, 10), unit)
  }

  private getInputChangeHandler = (unit: TimeUnit) => (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const TWO_DIGITS = /^\d{0,2}$/
    const THREE_DIGITS = /^\d{0,3}$/
    const text = getStringValueFromInputEvent(e)

    let isValid = false
    switch (unit) {
      case TimeUnit.HOUR_24:
      case TimeUnit.HOUR_12:
      case TimeUnit.MINUTE:
      case TimeUnit.SECOND:
        isValid = TWO_DIGITS.test(text)
        break
      case TimeUnit.MS:
        isValid = THREE_DIGITS.test(text)
        break
      default:
        throw Error('Invalid TimeUnit')
    }

    if (isValid) {
      switch (unit) {
        case TimeUnit.HOUR_24:
        case TimeUnit.HOUR_12:
          this.updateState({ hourText: text })
          break
        case TimeUnit.MINUTE:
          this.updateState({ minuteText: text })
          break
        case TimeUnit.SECOND:
          this.updateState({ secondText: text })
          break
        case TimeUnit.MS:
          this.updateState({ millisecondText: text })
          break
        default:
          throw Error('Invalid TimeUnit')
      }
    }
  }

  private getInputKeyDownHandler = (unit: TimeUnit) => (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    handleKeyEvent(e, {
      [Keys.ARROW_UP]: () => this.incrementTime(unit),
      [Keys.ARROW_DOWN]: () => this.decrementTime(unit),
      [Keys.ENTER]: () => {
        ;(e.currentTarget as HTMLInputElement).blur()
      }
    })
  }

  private handleFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (this.props.selectAllOnFocus) {
      e.currentTarget.select()
    }
  }

  private handleAmPmChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const isNextPm = e.currentTarget.value === 'pm'
    if (isNextPm !== this.state.isPm) {
      const hour = DateUtils.convert24HourMeridiem(
        this.state.value!.getHours(),
        isNextPm
      )
      this.setState({ isPm: isNextPm }, () =>
        this.updateTime(hour, TimeUnit.HOUR_24)
      )
    }
  }

  // begin method definitions: state modification

  /**
   * Generates a full ITimePickerState object with all text fields set to formatted strings based on value
   */
  private getFullStateFromValue(
    value: Date,
    useAmPm: boolean
  ): ITimePickerState {
    const timeInRange = DateUtils.getTimeInRange(
      value,
      this.props.minTime!,
      this.props.maxTime!
    )
    const hourUnit = useAmPm ? TimeUnit.HOUR_12 : TimeUnit.HOUR_24
    /* tslint:disable:object-literal-sort-keys */
    return {
      hourText: formatTime(timeInRange.getHours(), hourUnit),
      minuteText: formatTime(timeInRange.getMinutes(), TimeUnit.MINUTE),
      secondText: formatTime(timeInRange.getSeconds(), TimeUnit.SECOND),
      millisecondText: formatTime(timeInRange.getMilliseconds(), TimeUnit.MS),
      value: timeInRange,
      isPm: DateUtils.getIsPmFrom24Hour(timeInRange.getHours())
    }
    /* tslint:enable:object-literal-sort-keys */
  }

  private incrementTime = (unit: TimeUnit) => this.shiftTime(unit, 1)
  private decrementTime = (unit: TimeUnit) => this.shiftTime(unit, -1)
  private shiftTime(unit: TimeUnit, amount: number) {
    if (this.props.disabled) {
      return
    }
    const newTime = getTimeUnit(unit, this.state.value!) + amount
    this.updateTime(wrapTimeAtUnit(unit, newTime), unit)
  }

  private updateTime(time: number, unit: TimeUnit) {
    const newValue = DateUtils.clone(this.state.value!)

    if (isTimeUnitValid(unit, time)) {
      setTimeUnit(unit, time, newValue, this.state.isPm!)
      if (
        DateUtils.isTimeInRange(
          newValue,
          this.props.minTime!,
          this.props.maxTime!
        )
      ) {
        this.updateState({ value: newValue })
      } else {
        this.updateState(
          this.getFullStateFromValue(this.state.value!, this.props.useAmPm!)
        )
      }
    } else {
      this.updateState(
        this.getFullStateFromValue(this.state.value!, this.props.useAmPm!)
      )
    }
  }

  private updateState(state: ITimePickerState) {
    let newState = state
    const hasNewValue =
      newState.value != null &&
      !DateUtils.areSameTime(newState.value, this.state.value!)

    if (this.props.value == null) {
      // component is uncontrolled
      if (hasNewValue) {
        newState = this.getFullStateFromValue(
          newState.value!,
          this.props.useAmPm!
        )
      }
      this.setState(newState)
    } else {
      // component is controlled, and there's a new value
      // so set inputs' text based off of _old_ value and later fire onChange with new value
      if (hasNewValue) {
        this.setState(
          this.getFullStateFromValue(this.state.value!, this.props.useAmPm!)
        )
      } else {
        // no new value, this means only text has changed (from user typing)
        // we want inputs to change, so update state with new text for the inputs
        // but don't change actual value
        this.setState({
          ...newState,
          value: DateUtils.clone(this.state.value!)
        })
      }
    }

    if (hasNewValue) {
      Utils.safeInvoke(this.props.onChange, newState.value)
    }
  }
}

function formatTime(time: number, unit: TimeUnit) {
  switch (unit) {
    case TimeUnit.HOUR_24:
      return time.toString()
    case TimeUnit.HOUR_12:
      return DateUtils.get12HourFrom24Hour(time).toString()
    case TimeUnit.MINUTE:
    case TimeUnit.SECOND:
      return Utils.padWithZeroes(time.toString(), 2)
    case TimeUnit.MS:
      return Utils.padWithZeroes(time.toString(), 3)
    default:
      throw Error('Invalid TimeUnit')
  }
}

function getStringValueFromInputEvent(
  e: React.SyntheticEvent<HTMLInputElement>
) {
  return (e.target as HTMLInputElement).value
}

interface IKeyEventMap {
  [key: number]: () => void
}

function handleKeyEvent(
  e: React.KeyboardEvent<HTMLInputElement>,
  actions: IKeyEventMap,
  preventDefault = true
) {
  for (const k of Object.keys(actions)) {
    const key = Number(k)
    if (e.which === key) {
      if (preventDefault) {
        e.preventDefault()
      }
      actions[key]()
    }
  }
}
