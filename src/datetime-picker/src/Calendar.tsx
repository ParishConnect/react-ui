import Box from '@parishconnect/box'
import addDays from 'date-fns/add_days'
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'
import isSameDay from 'date-fns/is_same_day'
import startOfMonth from 'date-fns/start_of_month'
import * as React from 'react'
import { Button } from '../../buttons'
import { majorScale } from '../../scales'
import { ThemeConsumer } from '../../theme/index'
import { Heading } from '../../typography'

const SUN = 0
const SAT = 6

interface DateFnsOptions {
  increment?: number
  [key: string]: any
}

type DateFnsType = number | string | Date

const makeDaysArray = (
  pivot: DateFnsType,
  length: number,
  { increment = 1, ...rest }: DateFnsOptions = {}
) => {
  //@ts-ignore
  return Array.from({ length }).reduce(
    ({ acc, pivot }) => {
      const date = addDays(pivot, increment)
      const props = Object.entries(rest).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: typeof value === 'function' ? value(date) : value
        }
      }, {})
      return {
        acc:
          increment > 0
            ? [...acc, { date, ...props }]
            : [{ date, ...props }, ...acc],
        pivot: date
      }
    },
    { acc: [], pivot }
  ).acc
}

function makeCalendarData(
  pivotDate: DateFnsType,
  selectedDate: DateFnsType,
  disableDates: any,
  recurrenceRule: any
) {
  const today = new Date()
  const totalDays = getDaysInMonth(pivotDate)
  const firstDay = startOfMonth(pivotDate)
  const lastDay = addDays(firstDay, totalDays)
  const dayOfFirstDay = getDay(firstDay)
  const dayOfLastDay = getDay(lastDay)

  const recurrenceDateArray =
    recurrenceRule && recurrenceRule.between(firstDay, lastDay, true)

  const present = makeDaysArray(addDays(firstDay, -1), totalDays, {
    isCurrentMonth: true,
    isToday: (date: Date) => isSameDay(date, today),
    isSelected: (date: Date) => isSameDay(date, selectedDate),
    isActive: (date: Date) => {
      if (recurrenceDateArray) {
        try {
          return recurrenceDateArray.some((rDate: Date) =>
            isSameDay(date, rDate)
          )
        } catch (error) {
          return false
        }
      }
    },
    isDisabled: disableDates
  })

  // Complement days from previous month
  const past = makeDaysArray(
    firstDay,
    dayOfFirstDay === SUN ? 0 : dayOfFirstDay,
    {
      increment: -1,
      isCurrentMonth: false,
      isSelected: (date: Date) => isSameDay(date, selectedDate),
      isDisabled: disableDates
    }
  )

  // Calculate how many dates in the future we need to add to calendar
  // Always show 6 weeks to avoid UI jumping
  const MAX_DAYS_SHOWN = 42

  // TODO: Add prop to start calendar on Monday
  const preliminaryFutureDays =
    dayOfLastDay === SUN ? 0 : SAT - dayOfLastDay + 1

  const actualFutureDays =
    past.length + present.length + preliminaryFutureDays === MAX_DAYS_SHOWN
      ? preliminaryFutureDays
      : MAX_DAYS_SHOWN - present.length - past.length

  const future = makeDaysArray(addDays(lastDay, -1), actualFutureDays, {
    increment: 1,
    isCurrentMonth: false,
    isSelected: date => isSameDay(date, selectedDate),
    isDisabled: disableDates
  })

  return [...past, ...present, ...future]
}

export function getWeekdayNames(
  dates: Date[],
  locale: any,
  { weekday }: Intl.DateTimeFormatOptions
) {
  return dates.map(d => {
    const name = new Intl.DateTimeFormat(locale, { weekday }).format(d)
    // Some locales may have the same weekday name in narrow format
    // e.g. T(iistai) and T(orstai) in Finnish
    return { name, key: name + d }
  })
}

const DEFAULT = {
  locale: 'en-US',
  localeOptions: {
    weekday: 'short',
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  }
}

export function DateBox({ children, ...props }) {
  return (
    <Box
      role="gridcell"
      userSelect="none"
      width={`calc(${100 / 7}% )`}
      height={majorScale(4) + 4}
      padding={2}
      textAlign="center"
      {...(props as any)}
    >
      {children}
    </Box>
  )
}

interface CalendarProps {
  pivotDate: DateFnsType
  selectedDate: DateFnsType
  onClick?: (date: DateFnsType) => void
  locale?: string | string[]
  localeOptions?: Partial<Intl.DateTimeFormatOptions>
  disabledDates?: (date: Date) => boolean
  recurrenceRule?: object
  showTrailingDays?: boolean
  showWeekdays?: boolean
  [key: string]: any
}

const Calendar: React.FC<CalendarProps> = ({
  pivotDate,
  selectedDate,
  onClick,
  locale = DEFAULT.locale,
  localeOptions = DEFAULT.localeOptions,
  disableDates,
  recurrenceRule,
  showWeekdays = true,
  showTrailingDays = true,
  ...rest
}) => {
  const dates = makeCalendarData(
    pivotDate,
    selectedDate,
    disableDates,
    recurrenceRule
  )
  let weekdays = showWeekdays
    ? getWeekdayNames(
        dates.slice(0, 7).map(({ date }) => date),
        locale,
        localeOptions
      )
    : []
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: localeOptions.day || DEFAULT.localeOptions.day
  })

  return (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      paddingTop={majorScale(2)}
      role="presentation"
      {...rest}
    >
      {weekdays.map(({ name, key }) => (
        <DateBox key={key}>
          <Heading size={400}>{name}</Heading>
        </DateBox>
      ))}

      {dates.map(
        ({
          date,
          isCurrentMonth,
          isToday,
          isSelected,
          isDisabled,
          isActive
        }) => (
          <ThemeConsumer key={date.toString()}>
            {theme => (
              <DateBox
                opacity={!showTrailingDays && !isCurrentMonth ? 0 : 1}
                aria-selected={isSelected ? 'true' : 'false'}
              >
                <Button
                  padding={0}
                  display="block"
                  width="100%"
                  textAlign="center"
                  appearance={isSelected ? 'primary' : 'minimal'}
                  position="relative"
                  onClick={() => onClick && onClick(date)}
                  disabled={isDisabled}
                  isActive={!isSelected && isActive}
                  css={{
                    color: isSelected
                      ? theme.scales.neutral.N1
                      : isCurrentMonth
                      ? theme.colors.text.dark
                      : theme.scales.neutral.N6,
                    borderRadius: isDisabled && 0
                  }}
                >
                  {dateFormatter.format(date)}
                  {isToday ? (
                    <Box
                      borderRadius={100}
                      background={
                        isSelected
                          ? theme.scales.neutral.N1
                          : theme.getThemeColor(theme)
                      }
                      position="absolute"
                      width={4}
                      height={4}
                      bottom={4}
                      right={4}
                    />
                  ) : null}
                </Button>
              </DateBox>
            )}
          </ThemeConsumer>
        )
      )}
    </Box>
  )
}

export default Calendar
