import React from 'react'
import MuiPagination from '@material-ui/lab/Pagination'

const Pagination = ({ count, changePage, currentpage }) => (
  <MuiPagination
    onChange={(_, page) => { changePage(page) }}
    page={currentpage}
    count={count}
    variant="outlined"
    shape="rounded"
    showFirstButton
    showLastButton
  />
)

export default Pagination
