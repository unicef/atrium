import React from 'react'
import { useSelector } from 'react-redux'
import { searchIsLoading } from '../../../../selectors'
import { OverlayLoader } from '../../../atoms'

const Loader = () => {
  const isLoading = useSelector(searchIsLoading)

  return <OverlayLoader isLoading={isLoading} />
}

export default Loader
