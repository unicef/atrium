import { Interval, DateTime } from 'luxon'

const TIME_NOW_UTC =  DateTime.local().toUTC()
/**
 * Get relative time between a provided time in string or number and now
 * @param {string | number} currentTime 
 */
export function getRelativeTimeToNow(currentTime) {
  const parsedCurrentTime = DateTime.fromISO(currentTime)

  return getRelativeTime(parsedCurrentTime, TIME_NOW_UTC)
}

/**
 * Get rounded relative time between two dates
 *
 * @param {DateTime} firstDate
 * @param {DateTime} secondDate
 */
export function getRelativeTime(firstDate, secondDate = TIME_NOW_UTC) {
  const interval = Interval.fromDateTimes(firstDate, secondDate)

  let text
  if (interval.length('hours') < 1) {
    const minutesDuration = Math.round(interval.length('minutes'))
    text = `${minutesDuration} ${minutesDuration === 1 ? 'minute' : 'minutes'}`
  } else if (interval.length('days') < 1) {
    const hoursDuration = Math.round(interval.length('hours'))
    text = `${hoursDuration} ${hoursDuration === 1 ? 'hour' : 'hours'}`
  } else if (interval.length('months') < 1) {
    const daysDuration = Math.round(interval.length('days'))
    text = `${daysDuration} ${daysDuration === 1 ? 'day' : 'days'}`
  } else if (interval.length('years') < 1) {
    const monthsDuration = Math.round(interval.length('months'))
    text = `${monthsDuration} ${monthsDuration === 1 ? 'month' : 'months'}`
  } else {
    const yearsDuration = Math.round(interval.length('years'))
    text = `${yearsDuration} ${yearsDuration === 1 ? 'year' : 'years'}`
  }

  return text
}
