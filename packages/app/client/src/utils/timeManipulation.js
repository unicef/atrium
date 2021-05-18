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

  const time = {
    minutes: {
      interval: interval.length('minutes'),
      singularSufix: 'minute',
      pluralSufix: 'minutes'
    },
    hours: {
      interval: interval.length('hours'),
      singularSufix: 'hour',
      pluralSufix: 'hours'
    },
    days: {
      interval: interval.length('days'),
      singularSufix: 'day',
      pluralSufix: 'days'
    },
    months: {
      interval: interval.length('months'),
      singularSufix: 'month',
      pluralSufix: 'months'
    },
    years: {
      interval: interval.length('years'),
      singularSufix: 'year',
      pluralSufix: 'years'
    }
  }

  const text = Object.keys(time).reduce((newText, key) => {
    const timePartition = time[key]
    const isNaN = Number.isNaN(timePartition.interval)

    if (timePartition.interval >= 1 && !isNaN) {
      const duration = Math.round(timePartition.interval)
      return `${duration} ${duration > 1 ? timePartition.pluralSufix : timePartition.singularSufix}`
    }

    return newText

  }, '< 1 min')

  return text
}
