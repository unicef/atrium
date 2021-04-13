import React from 'react'
import { SearchWithSideMenu } from '../../templates'
import { SearchBar, SearchListWrapper } from './components'

const Search = ({ Menu, List, title, searchBarRightSide }) => {
  // TODO: improve to use the query string in the browser url
  return (
    <SearchWithSideMenu
      SideMenuComponent={Menu}
      SearchBarComponent={(props) => <SearchBar rightSideComponent={searchBarRightSide} title={title} {...props} />} 
      ListComponent={() => <List WrapperComponent={SearchListWrapper} />}
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
