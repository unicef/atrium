import React from 'react'
import { useSelector } from 'react-redux'
import { SortByDateHeader } from '../../../molecules'
import { useSearchActions } from '../../../hooks'
import { searchSort } from '../../../../selectors'

const ListHeader = ({ text }) => {
  const { sortAsc, sortDesc } = useSearchActions()
  const sort = useSelector(searchSort)

  return (
    <SortByDateHeader
      sortAsc={sortAsc}
      sortDesc={sortDesc}
      sortDirection={sort} 
      name={text}
    />
  )
  
}

export default ListHeader
