import React from 'react'
import { useSelector } from 'react-redux'
import {
  getNumberOfPages,
  getSearchContext,
  getSearchedUserBookmarks
} from '../../../../selectors'
import {
  useUserBookmarksAsyncActions,
  useSearchActions,
  useQueryParams
} from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import { EmptyResults } from '../../../molecules'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { SearchPaginatedList } from '../../../templates'
import { Loader } from '../../Search/components'
import {BookmarkCard} from "../../../organisms";

const MAX_BOOKMARKS_PER_PAGE = 6
const SEARCH_CONTEXT = 'BOOKMARKS'

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '5%'
  }
}))

function Bookmarks(props) {
  const classes = useStyles()
  const history = useHistory()

  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const { onChangeParam, getString, getEntriesObj } = useQueryParams()
  const { fetchSearchedUserBookmarks } = useUserBookmarksAsyncActions()
  const { sort = 'asc', page } = getEntriesObj()

  const bookmarks = useSelector(getSearchedUserBookmarks)
  const pagesCounter = useSelector(getNumberOfPages)
  const searchContextName = useSelector(getSearchContext)
  React.useEffect(() => {
    const query = combineUserItemsQueryStrings({
      limit: MAX_BOOKMARKS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_BOOKMARKS_PER_PAGE,
      sort
    })

    if (searchContextName !== SEARCH_CONTEXT) {
      resetSearch()
      setCurrentPageContext(SEARCH_CONTEXT)
    }

    const requestBookmarks = async () => {
      await fetchSearchedUserBookmarks(query)
    }

    requestBookmarks()
  }, [sort, page])

  if (!Array.isArray(bookmarks) || bookmarks.length === 0)
    return (
      <EmptyResults
        mainMessage="You don’t have any bookmarks yet"
        buttonLabel="Add bookmark"
        handleClick={() => history.push('/projects')}
        buttonProps={{ className: classes.button }}
      />
    )

  return (
    <SearchPaginatedList
      currentpage={page}
      onChangeParam={onChangeParam}
      getString={getString}
      numberOfPages={pagesCounter}
      withHeader
      headerProps={{
        withPrefix: false,
        name: `My bookmarks (${bookmarks.length})`,
        sortDirection: sort,
        sortBy: 'Date'
      }}
    >
      {bookmarks.map((bookmark, i) => (
        <BookmarkCard
          key={bookmark.id}
          end={i === bookmarks.length - 1}
          bookmark={bookmark}
        />
      ))}
      <Loader />
    </SearchPaginatedList>
  )
}

export default Bookmarks
