import React from 'react'
import { SearchPaginatedList, SearchWithSideMenu } from '../../templates'
import { SearchBar, Loader } from './components'

const Search = ({ Menu, List, title, searchBarRightSide }) => {
  return (
    <SearchWithSideMenu
      sideMenu={<Menu />}
      list={<List WrapperComponent={SearchPaginatedList} />}
      loader={<Loader />}
      SearchBarComponent={(props) => <SearchBar rightSideComponent={searchBarRightSide} title={title} {...props} />}
    />
  )
}

Search.defaultProps = {
  searchBarRightSide: null,
  Menu: null,
  List: null,
  title: ''
}

export default Search
