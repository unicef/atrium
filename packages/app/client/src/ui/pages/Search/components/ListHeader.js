import React from 'react'
import { useSelector } from 'react-redux'
import { SearchSortingHeader } from '../../../molecules'
import { useSearchActions } from '../../../hooks'
import { searchSort } from '../../../../selectors'

const ListHeader = ({ text, sortBy }) => {
  const { sortAsc, sortDesc } = useSearchActions()
  const sort = useSelector(searchSort)

  return (
    <SearchSortingHeader
      sortAsc={sortAsc}
      sortDesc={sortDesc}
      sortDirection={sort} 
      name={text}
      sortBy={sortBy}
    />
  )
  
}

export default ListHeader
