import { useMemo } from 'react'

const useTrimmedText = ({ text, max }) => {
  const trimmedDetails = useMemo(() => {
    if (text && typeof text === 'string') {
      return text.length && text.length >= max
        ? `${text.substring(0, (max - 3))}...`
        : text
    }

    return text
  }, [text])

  return trimmedDetails
}

export default useTrimmedText
