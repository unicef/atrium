import React from 'react'
import debounce from '../../../../utils/debounce'
import { useSelector } from 'react-redux'
import { SearchBarWithSideMenuButton } from '../../../organisms'
import { useSearchActions } from '../../../hooks'
import { getSearchText } from '../../../../selectors'

const SEARCH_TIMEOUT_MS = 800

const SearchBar = ({ isSideMenuVisible, placeholder, title, rightSideComponent, toggleSideMenu }) => {
  const { addSearch } = useSearchActions()
  const searchText = useSelector(getSearchText)

  const onSearch =  debounce((value) => {
    addSearch(value)
  }, SEARCH_TIMEOUT_MS)

  return (
    <SearchBarWithSideMenuButton
      searchText={searchText}
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
