import React from 'react'
import MuiPagination from '@material-ui/lab/Pagination'
import Box from '@material-ui/core/Box'

const Pagination = ({ count, changePage, currentpage, wrapperProps }) => (
  <Box {...wrapperProps}>
    <MuiPagination
      onChange={(_, page) => { changePage(page) }}
      page={parseInt(currentpage)}
      count={count}
      variant="outlined"
      shape="rounded"
      showFirstButton
      showLastButton
    />
  </Box>
)

export default Pagination
