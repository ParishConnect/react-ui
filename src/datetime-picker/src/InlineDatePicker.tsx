import Box from '@hennessyevan/aluminum-box'
import addDays from 'date-fns/add_days'
import addMonths from 'date-fns/add_months'
import addWeeks from 'date-fns/add_weeks'
import addYears from 'date-fns/add_years'
import * as React from 'react'
import uuid from 'uuid'
import { Button, IconButton } from '../../buttons'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from '../../icons/index'
import { majorScale } from '../../scales'
import { Text } from '../../typography'
import Calendar from './Calendar'

const arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right'
}

const getUniqueId = (prefix: string): string => `${prefix}-${uuid()}`

type DateType = string | number | Date

export interface InlineDatePickerProps {
  /**
   * Set an initial day value and/or assume control via this prop
   * @default new Date()
   */
  value: Date
  /**
   * Set a locale
   * @default 'en-CA'
   */
  locale?: string
  localeOptions?: Partial<Intl.DateTimeFormatOptions>
  disableDates?: (date: Date) => boolean
  onChange?: any
  todayButtonLabel?: string
  shouldShowTodayButton?: boolean
  shouldShowYearButtons?: boolean
  width?: string | number
  dateFormatter?: any
  mobile?: boolean
  detectMobile?: boolean
  [key: string]: any
}

export interface InlineDatePickerState {
  pivotDate?: any
}

export default class InlineDatePicker extends React.Component<
  InlineDatePickerProps,
  InlineDatePickerState
> {
  static defaultProps = {
    width: 280,
    value: new Date(),
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

  containerRef: any

  state: InlineDatePickerState = {
    pivotDate: this.props.value
  }

  changePivotDate = (pivotDate: DateType) => this.setState({ pivotDate })

  getCurrentMonthTitle = () =>
    new Intl.DateTimeFormat(this.props.locale, {
      month:
        this.props.localeOptions.month ||
        InlineDatePicker.defaultProps.localeOptions.month,
      year:
        this.props.localeOptions.year ||
        InlineDatePicker.defaultProps.localeOptions.year
    }).format(this.state.pivotDate)

  doGoToNextMonth = () =>
    this.changePivotDate(addMonths(this.state.pivotDate, 1))

  doGoToPrevMonth = () =>
    this.changePivotDate(addMonths(this.state.pivotDate, -1))

  doGoToNextYear = () => this.changePivotDate(addYears(this.state.pivotDate, 1))

  doGoToPrevYear = () =>
    this.changePivotDate(addYears(this.state.pivotDate, -1))

  doJumpToToday = () => {
    const today = new Date()
    this.changePivotDate(today)
    return this.props.onChange && this.props.onChange(today)
  }

  doCalendarClick = (date: Date) => {
    this.changePivotDate(date)
    return this.props.onChange && this.props.onChange(date)
  }

  onKeyDown = (e: KeyboardEvent) => {
    const { key } = e
    const arrowKey = arrowKeys[key]

    this.containerRef.focus()

    if (key === 'Enter' || key === ' ') {
      return this.props.onChange && this.props.onChange(this.state.pivotDate)
    }

    if (arrowKey === 'up') {
      this.changePivotDate(addWeeks(this.state.pivotDate, -1))
      return
    }
    if (arrowKey === 'down') {
      this.changePivotDate(addWeeks(this.state.pivotDate, 1))
      return
    }
    if (arrowKey === 'left') {
      this.changePivotDate(addDays(this.state.pivotDate, -1))
      return
    }
    if (arrowKey === 'right') {
      this.changePivotDate(addDays(this.state.pivotDate, 1))
      return
    }
  }

  render() {
    const {
      value,
      shouldShowTodayButton,
      shouldShowYearButtons,
      todayButtonLabel,
      locale,
      localeOptions,
      disableDates,
      ...props
    } = this.props

    const announceId = getUniqueId('announce')

    return (
      <Box
        display="flex"
        flexDirection="column"
        padding={majorScale(1)}
        innerRef={ref => (this.containerRef = ref)}
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        role="presentation"
        {...props}
        css={{ outline: 'none' }}
      >
        <Box
          id={announceId}
          aria-live="assertive"
          aria-relevant="text"
          border={0}
          clip="rect(0 0 0 0)"
          height={1}
          margin={-1}
          overflow="hidden"
          padding={0}
          position="absolute"
          width={1}
        >
          {new Date(this.state.pivotDate).toString()}
        </Box>
        <Box display="flex" alignItems="center">
          {shouldShowYearButtons && (
            <IconButton
              icon={ChevronsLeftIcon}
              appearance="minimal"
              onClick={this.doGoToPrevYear}
            />
          )}
          <IconButton
            icon={ChevronLeftIcon}
            appearance="minimal"
            onClick={this.doGoToPrevMonth}
          />
          <Text marginX="auto" userSelect="none">
            {this.getCurrentMonthTitle()}
          </Text>
          <IconButton
            icon={ChevronRightIcon}
            appearance="minimal"
            onClick={this.doGoToNextMonth}
          />
          {shouldShowYearButtons && (
            <IconButton
              icon={ChevronsRightIcon}
              appearance="minimal"
              onClick={this.doGoToNextYear}
            />
          )}
        </Box>
        <Calendar
          pivotDate={this.state.pivotDate}
          selectedDate={this.state.pivotDate}
          onClick={this.doCalendarClick}
          locale={locale}
          localeOptions={localeOptions}
          disableDates={disableDates}
          userSelect="none"
          aria-describedby={announceId}
          aria-label="calendar"
          role="grid"
        />
        {shouldShowTodayButton ? (
          <Button
            appearance="minimal"
            justifyContent="center"
            onClick={this.doJumpToToday}
          >
            {todayButtonLabel}
          </Button>
        ) : null}
      </Box>
    )
  }
}
