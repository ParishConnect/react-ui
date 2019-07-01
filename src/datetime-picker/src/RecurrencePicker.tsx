import Box from '@parishconnect/box'
import {
  addMonths,
  addYears,
  differenceInCalendarMonths,
  isSameDay,
  startOfDay,
  isDate,
  setHours,
  setMinutes
} from 'date-fns'
import addDays from 'date-fns/add_days'
import addWeeks from 'date-fns/add_weeks'
import * as React from 'react'
import VirtualList from 'react-tiny-virtual-list'
import uuid from 'uuid'
import { Pane } from '../../layers/index'
import { majorScale, minorScale } from '../../scales'
import { Code, Heading, Text } from '../../typography'
import Calendar, { DateBox } from './Calendar'
import { IconButton } from '../../buttons/index'
import { XIcon } from '../../icons/index'
import { Info } from 'luxon'

const arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right'
}

const getUniqueId = (prefix: string): string => `${prefix}-${uuid()}`

type DateType = string | number | Date

const getWeekdays = (): string[] => {
  const weekdays = Array.from(Info.weekdays('short'))
  const reWeekdays = Array.from(weekdays)
  reWeekdays.unshift(reWeekdays.pop()!)

  return reWeekdays
}

export interface RecurrencePickerProps {
  /**
   * Set an initial day value and/or assume control via this prop
   * @default new Date()
   */
  value?: Date
  /**
   * Set a locale
   * @default 'en-CA'
   */
  locale?: string
  /**
   * Options for locale string parsing
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   */
  localeOptions?: Partial<Intl.DateTimeFormatOptions>
  disableDates?: (date: Date) => boolean
  /**
   * Passes the current
   */
  onChange?: (selectedDate: Date) => void
  /**
   * When close button is clicked
   */
  onClose?: () => void
  title?: string
  dateFormatter?: any
  /**
   * How many calendar months to load outside of the view
   * @warning Keep this number low. All rendered calendars get re-rendered every click.
   * @default 1
   */
  overscanCount?: number
  recurrenceRule?: any
  /**
   * How many years from today to calculate the recurring rule
   * @default 1.5
   */
  yearsToCompute?: number
  /**
   * Components to load in right-side of pane
   * @param selectedDate - The currently selected calendar date
   * @param deselect - optionally call this function to deselect the date in the calendar
   * @param close - call onClose
   */
  dateComponents?: (
    selectedDate: Date,
    deselect: () => void,
    close: () => void
  ) => React.ReactChild
  /**
   *
   */
  noResults?: React.ReactChild
  [key: string]: any
}

export interface RecurrencePickerState {
  pivotDate?: any
}

export default class RecurrencePicker extends React.Component<
  RecurrencePickerProps,
  RecurrencePickerState
> {
  recurrenceDates: any
  containerRef: any
  constructor(props: RecurrencePickerProps) {
    super(props)
    const today = startOfDay(new Date())
    this.recurrenceDates = props.recurrenceRule.between(
      today,
      addYears(today, props.yearsToCompute!),
      true
    )
    this.containerRef = Array(this.getMonthCount())
  }

  static defaultProps = {
    value: null,
    overscanCount: 1,
    yearsToCompute: 1.5,
    locale: 'en-US',
    title: 'Edit Times',
    onClose: () => {},
    onChange: () => {},
    dateComponents: () => (
      <Box>
        Pass in some components:{' '}
        <Code display="inline-block">
          {'dateComponent={selectedDate => ReactChild}'}
        </Code>
      </Box>
    ),
    localeOptions: {
      weekday: 'short',
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    }
  }

  state: RecurrencePickerState = {
    pivotDate: this.props.value
  }

  formatPivotDate = (rawDate: Date): Date => {
    if (this.props.value && isDate(this.props.value)) {
      return setHours(
        setMinutes(rawDate, this.props.value.getMinutes()),
        this.props.value.getHours()
      )
    }
    return rawDate
  }

  changePivotDate = (pivotDate: DateType) => {
    this.setState({ pivotDate })
  }

  getCurrentMonthTitle = (offset: number) =>
    new Intl.DateTimeFormat(this.props.locale, {
      month:
        this.props.localeOptions!.month ||
        RecurrencePicker.defaultProps.localeOptions.month,
      year:
        this.props.localeOptions!.year ||
        RecurrencePicker.defaultProps.localeOptions.year
    }).format(addMonths(this.recurrenceDates[0], offset))

  doCalendarClick = (date: Date) => {
    if (this.recurrenceDates.some((rdate: Date) => isSameDay(rdate, date))) {
      date = this.formatPivotDate(date)
      this.changePivotDate(date)
      return this.props.onChange && this.props.onChange(date)
    }
    return
  }

  onKeyDown = (e: KeyboardEvent, index: number) => {
    const { key } = e
    const arrowKey = arrowKeys[key]

    this.containerRef[index].focus()
    e.preventDefault()

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

  getMonthCount = () =>
    differenceInCalendarMonths(
      this.recurrenceDates[this.recurrenceDates.length - 1],
      this.recurrenceDates[0]
    )

  getDisabledDates = (date: Date) =>
    !this.recurrenceDates.some(rdate => isSameDay(rdate, date))

  deselect = () => this.setState({ pivotDate: null })

  renderDateComponents = () => {
    const { dateComponents, noResults } = this.props

    if (!this.state.pivotDate) {
      if (noResults) {
        return noResults
      }
      return ''
    }
    return dateComponents!(
      this.state.pivotDate,
      this.deselect,
      this.props.onClose!
    )
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
      recurrenceRule,
      overscanCount,
      dateComponents,
      noResults,
      height,
      onClose,
      yearsToCompute,
      title,
      ...props
    } = this.props

    if (!recurrenceRule) {
      return new Error('You must supply a valid recurrence rule')
    }

    const announceId = getUniqueId('announce')

    return (
      <Box width="100%" minWidth={500} display="flex">
        <Pane
          background="tint1"
          flexBasis={290}
          width={290}
          minWidth={290}
          overflow="hidden"
          height={height}
          borderRight
        >
          <Pane
            borderBottom
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            paddingTop={minorScale(3)}
            paddingLeft={majorScale(1)}
            paddingRight={majorScale(2)}
            role="presentation"
          >
            {getWeekdays().map((name, key) => (
              <DateBox key={key}>
                <Heading size={400}>{name}</Heading>
              </DateBox>
            ))}
          </Pane>
          <VirtualList
            style={{
              paddingTop: majorScale(2),
              overflowX: 'hidden',
              scrollSnapType: 'y',
              scrollPaddingTop: majorScale(2)
            }}
            overscanCount={overscanCount}
            itemSize={280}
            width={290}
            height={height - 64}
            itemCount={this.getMonthCount()}
            renderItem={({ index, style }) => (
              <Box
                key={String(index)}
                display="flex"
                flexDirection="column"
                padding={majorScale(1)}
                innerRef={ref => (this.containerRef[index] = ref)}
                tabIndex={0}
                onKeyDown={(e: KeyboardEvent) => e.preventDefault()}
                role="presentation"
                {...style}
                {...props as any}
                css={{ outline: 'none', scrollSnapAlign: 'start end' }}
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
                  {new Date(
                    addMonths(this.recurrenceDates[0], index)
                  ).toString()}
                </Box>
                <Box display="flex" alignItems="center">
                  <Text fontWeight={600} marginX="auto" userSelect="none">
                    {this.getCurrentMonthTitle(index)}
                  </Text>
                </Box>
                <Calendar
                  showWeekdays={false}
                  showTrailingDays={false}
                  pivotDate={addMonths(this.recurrenceDates[0], index)}
                  selectedDate={this.state.pivotDate}
                  onClick={this.doCalendarClick}
                  locale={locale}
                  localeOptions={localeOptions}
                  recurrenceRule={recurrenceRule}
                  disableDates={this.getDisabledDates}
                  userSelect="none"
                  aria-describedby={announceId}
                  aria-label="calendar"
                  role="grid"
                />
              </Box>
            )}
          />
        </Pane>
        <Pane width="100%">
          <Pane
            borderBottom
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            paddingY={majorScale(1)}
            paddingX={majorScale(2)}
            role="presentation"
          >
            <Heading size={400}>{title}</Heading>
            <IconButton onClick={onClose} icon={XIcon} appearance="minimal" />
          </Pane>
          {this.renderDateComponents()}
        </Pane>
      </Box>
    )
  }
}
