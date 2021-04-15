import React from 'react'
import { SearchWithSideMenu } from '../../templates'
import { SearchBar, SearchListWrapper, Loader } from './components'

const Search = ({ Menu, List, title, searchBarRightSide }) => {
  // TODO: improve to use the query string in the browser url
  return (
    <SearchWithSideMenu
      sideMenu={<Menu />}
      list={<List WrapperComponent={SearchListWrapper} />}
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
