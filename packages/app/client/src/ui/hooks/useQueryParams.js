import { useMemo } from 'react'
import { useLocation, useHistory } from 'react-router'

const useQueryParams = () => {
  const initialQuery = useLocation().search
  const history = useHistory()
  const queryParams = useMemo(() => new URLSearchParams(initialQuery), [])

  const removeParam = (name) => {
    const paramExists = queryParams.has(name)

    if (paramExists) {
      queryParams.delete(name)
    } else {
      throw new Error("The specified param does not exists")
    }
  }

  const getString = ({ enhanced, pageLimit, offset } = {}) => {
    if (enhanced) {
      return `${queryParams.toString()}&offset=${offset}&limit=${pageLimit}`
    }

    return queryParams.toString()
  }

  const onChangeParam = (name, value) => {
    const paramExists = queryParams.has(name)

    if (paramExists) {
      queryParams.set(name, value)
    } else {
      queryParams.append(name, value)
    }

    history.push({ search: getString() })
  }

  const getEntriesObj = () => {
    const obj = {}
    for (const [key, value] of queryParams) {
      obj[key] = value
    }

    return obj
  }

  return { onChangeParam, removeParam, getString, queryParams, getEntriesObj }
}

export default useQueryParams
