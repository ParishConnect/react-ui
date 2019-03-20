export function areEqual(date1: Date, date2: Date) {
  if (date1 == null && date2 == null) {
    return true
  } else if (date1 == null || date2 == null) {
    return false
  } else {
    return date1.getTime() === date2.getTime()
  }
}

export function areSameTime(date1: Date, date2: Date) {
  return (
    date1 != null &&
    date2 != null &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes() &&
    date1.getSeconds() === date2.getSeconds() &&
    date1.getMilliseconds() === date2.getMilliseconds()
  )
}

export function clone(d: Date) {
  return new Date(d.getTime())
}

export const isTimeEqualOrGreaterThan = (time: Date, timeToCompare: Date) =>
  time.getTime() >= timeToCompare.getTime()
export const isTimeEqualOrSmallerThan = (time: Date, timeToCompare: Date) =>
  time.getTime() <= timeToCompare.getTime()

export function isTimeInRange(
  date: Date,
  minDate: Date,
  maxDate: Date
): boolean {
  const time = getDateOnlyWithTime(date)
  const minTime = getDateOnlyWithTime(minDate)
  const maxTime = getDateOnlyWithTime(maxDate)

  const isTimeGreaterThanMinTime = isTimeEqualOrGreaterThan(time, minTime)
  const isTimeSmallerThanMaxTime = isTimeEqualOrSmallerThan(time, maxTime)

  if (isTimeEqualOrSmallerThan(maxTime, minTime)) {
    return isTimeGreaterThanMinTime || isTimeSmallerThanMaxTime
  }

  return isTimeGreaterThanMinTime && isTimeSmallerThanMaxTime
}

export function getTimeInRange(time: Date, minTime: Date, maxTime: Date) {
  if (areSameTime(minTime, maxTime)) {
    return maxTime
  } else if (isTimeInRange(time, minTime, maxTime)) {
    return time
  } else if (isTimeSameOrAfter(time, maxTime)) {
    return maxTime
  }

  return minTime
}

/**
 * Returns true if the time part of `date` is later than or equal to the time
 * part of `dateToCompare`. The day, month, and year parts will not be compared.
 */
export function isTimeSameOrAfter(date: Date, dateToCompare: Date): boolean {
  const time = getDateOnlyWithTime(date)
  const timeToCompare = getDateOnlyWithTime(dateToCompare)

  return isTimeEqualOrGreaterThan(time, timeToCompare)
}

export function getDateTime(date: Date | null, time?: Date | null) {
  if (date == null) {
    return null
  } else if (time == null) {
    // cannot use default argument because `null` is a common value in this package.
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    )
  } else {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds()
    )
  }
}

export function getDateOnlyWithTime(date: Date): Date {
  return new Date(
    0,
    0,
    0,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )
}

export function convert24HourMeridiem(hour: number, toPm: boolean): number {
  if (hour < 0 || hour > 23) {
    throw new Error(`hour must be between [0,23] inclusive: got ${hour}`)
  }
  return toPm ? (hour % 12) + 12 : hour % 12
}

export function getIsPmFrom24Hour(hour: number): boolean {
  if (hour < 0 || hour > 23) {
    throw new Error(`hour must be between [0,23] inclusive: got ${hour}`)
  }
  return hour >= 12
}

export function get12HourFrom24Hour(hour: number): number {
  if (hour < 0 || hour > 23) {
    throw new Error(`hour must be between [0,23] inclusive: got ${hour}`)
  }
  const newHour = hour % 12
  return newHour === 0 ? 12 : newHour
}

export function get24HourFrom12Hour(hour: number, isPm: boolean): number {
  if (hour < 1 || hour > 12) {
    throw new Error(`hour must be between [1,12] inclusive: got ${hour}`)
  }
  const newHour = hour === 12 ? 0 : hour
  return isPm ? newHour + 12 : newHour
}
