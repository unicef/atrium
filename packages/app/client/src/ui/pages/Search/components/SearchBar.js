import React from 'react'
import debounce from '../../../../utils/debounce'
import { SearchBarWithSideMenuButton } from '../../../organisms'
import { useSearchActions } from '../../../hooks'

const SEARCH_TIMEOUT_MS = 800

const SearchBar = ({ isSideMenuVisible, placeholder, title, rightSideComponent, toggleSideMenu }) => {
  const { addSearch } = useSearchActions()

  const onSearch =  debounce((value) => {
    addSearch(value)
  }, SEARCH_TIMEOUT_MS)

  return (
    <SearchBarWithSideMenuButton
      placeholder={placeholder}
      title={title}
      isSideMenuVisible={isSideMenuVisible}
      showSideMenu={toggleSideMenu}
      hideSideMenu={toggleSideMenu}
      onChange={onSearch} 
      rightSideComponent={rightSideComponent}
    />
  )
}

export default SearchBar
