import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchActions } from '../../../hooks'
import { Pagination as CustomPagination } from '../../../atoms'
import { searchCurrentPage, getNumberOfPages } from '../../../../selectors'

const Pagination = ({ count }) => {
  const { changePage } = useSearchActions()
  const currentpage = useSelector(searchCurrentPage)
  const numberOfPages = useSelector(getNumberOfPages)

  if (numberOfPages === undefined) {
    return null
  }

  return (
    <CustomPagination
      wrapperProps={{ mb: 3 }}
      changePage={changePage}
      currentpage={currentpage}
      count={numberOfPages}
    />
  )
}

export default Pagination
