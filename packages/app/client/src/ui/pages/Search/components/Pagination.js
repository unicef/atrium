import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchActions } from '../../../hooks'
import { Pagination as CustomPagination } from '../../../atoms'
import { searchCurrentPage } from '../../../../selectors'

const Pagination = ({ count }) => {
  const { changePage } = useSearchActions()
  const currentpage = useSelector(searchCurrentPage)

  return (
    <CustomPagination
      changePage={changePage}
      currentpage={currentpage}
      count={count}
    />
  )
}

export default Pagination
