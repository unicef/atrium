import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '../atoms'
import { SearchSortingHeader } from '../molecules'

const SearchPaginatedList = ({ children, numberOfPages, onChangeParam, currentpage, headerProps, withHeader }) => (
  <Grid item xs={12} container>
    {withHeader &&
      <SearchSortingHeader
        sortAsc={() => onChangeParam('sort', 'asc')}
        sortDesc={() => onChangeParam('sort', 'desc')}
        {...headerProps}
      />
    }

    {children}

    {numberOfPages > 1 &&
      <Pagination
        wrapperProps={{
          mb: 2,
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
        changePage={(nextPage) => {
          onChangeParam('page', nextPage)
        }}
        currentpage={currentpage}
        count={numberOfPages}
      />
    }
  </Grid>
)

SearchPaginatedList.defaultProps = {
  numberOfPages: 0
}

export default SearchPaginatedList
