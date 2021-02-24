import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { SearchBar, SortDropdownMenu } from '../'

const PageFilter = ({
  filter,
  setFilter,
  searchPlaceholder,
  sortLabel,
  filterOptions,
  ...props
}) => {
  const updateSearch = e => {
    setFilter({ ...filter, search: e.target.value })
  }

  const updateSort = value => {
    setFilter({ ...filter, sort: value })
  }

  const clearSearchFilter = e => {
    setFilter({ ...filter, search: '' })
  }

  return (
    <Grid container spacing={3} alignItems="center" wrap="nowrap">
      <Grid item xs={12}>
        <SearchBar
          placeholder={searchPlaceholder}
          value={filter.search}
          onChange={updateSearch}
          clearFilter={clearSearchFilter}
        />
      </Grid>
      {sortLabel ? (
        <Grid item xs={3} zeroMinWidth>
          <SortDropdownMenu
            label={sortLabel}
            value={filter.sort}
            onChange={updateSort}
            options={filterOptions}
          />
        </Grid>
      ) : null}
    </Grid>
  )
}

PageFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.object),
  sortLabel: PropTypes.string.isRequired
}

export default PageFilter
