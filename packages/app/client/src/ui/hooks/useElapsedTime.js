import { useMemo } from 'react'

const useElapsedTime = ({ createdAt }) => {
  return useMemo(() => {
    const today = new Date()
    const createdOn = new Date(createdAt)
    const msInDay = 24 * 60 * 60 * 1000
    createdOn.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    return (+today - +createdOn) / msInDay
  }, [createdAt])
}

export default useElapsedTime
