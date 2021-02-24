import { DateTime } from 'luxon'
import { getRelativeTime } from './timeManipulation'

describe('Should get relative time correctly', () => {
  const latestTime = DateTime.fromISO('2020-02-06T18:44:21+00:00')
  const latestTimeMinusMinute = DateTime.fromISO('2020-02-06T18:43:21+00:00')
  const latestTimeMinusMinutes = DateTime.fromISO('2020-02-06T18:42:21+00:00')
  const latestTimeMinusHour = DateTime.fromISO('2020-02-06T17:43:21+00:00')
  const latestTimeMinusHours = DateTime.fromISO('2020-02-06T16:43:21+00:00')
  const latestTimeMinusDay = DateTime.fromISO('2020-02-05T18:43:21+00:00')
  const latestTimeMinusDays = DateTime.fromISO('2020-02-04T18:43:21+00:00')
  const latestTimeMinusMonth = DateTime.fromISO('2020-01-06T18:43:21+00:00')
  const latestTimeMinusMonths = DateTime.fromISO('2019-12-06T18:43:21+00:00')
  const latestTimeMinusYear = DateTime.fromISO('2019-02-06T18:43:21+00:00')
  const latestTimeMinusYears = DateTime.fromISO('2018-02-06T18:43:21+00:00')

  test('Should get relative time if one minute', () => {
    const result = getRelativeTime(latestTimeMinusMinute, latestTime)
    expect(result).toBe('1 minute')
  })
  test('Should get relative time if several minutes', () => {
    const result = getRelativeTime(latestTimeMinusMinutes, latestTime)
    expect(result).toBe('2 minutes')
  })
  test('Should get relative time if one hour', () => {
    const result = getRelativeTime(latestTimeMinusHour, latestTime)
    expect(result).toBe('1 hour')
  })
  test('Should get relative time if several hours', () => {
    const result = getRelativeTime(latestTimeMinusHours, latestTime)
    expect(result).toBe('2 hours')
  })
  test('Should get relative time if one day', () => {
    const result = getRelativeTime(latestTimeMinusDay, latestTime)
    expect(result).toBe('1 day')
  })
  test('Should get relative time if several days', () => {
    const result = getRelativeTime(latestTimeMinusDays, latestTime)
    expect(result).toBe('2 days')
  })
  test('Should get relative time if one month', () => {
    const result = getRelativeTime(latestTimeMinusMonth, latestTime)
    expect(result).toBe('1 month')
  })
  test('Should get relative time if several months', () => {
    const result = getRelativeTime(latestTimeMinusMonths, latestTime)
    expect(result).toBe('2 months')
  })
  test('Should get relative time if one year', () => {
    const result = getRelativeTime(latestTimeMinusYear, latestTime)
    expect(result).toBe('1 year')
  })
  test('Should get relative time if several years', () => {
    const result = getRelativeTime(latestTimeMinusYears, latestTime)
    expect(result).toBe('2 years')
  })
})
