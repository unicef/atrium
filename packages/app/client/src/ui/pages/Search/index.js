import React from 'react'
import { SearchWithSideMenu } from '../../templates'
import { SearchBar, SearchListWrapper } from './components'

const Search = ({ Menu, List, title }) => {
  // TODO: improve to use the query string in the browser url
  return (
    <SearchWithSideMenu
      SideMenuComponent={Menu}
      SearchBarComponent={(props) => <SearchBar title={title} {...props} />} 
      ListComponent={() => <List WrapperComponent={SearchListWrapper} />}
    />
  )
}

export default Search
