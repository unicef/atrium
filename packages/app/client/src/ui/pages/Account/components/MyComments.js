import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Loader, SearchListWrapper } from '../../Search/components'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserComments,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import { useUserCommentsAsyncActions, useSearchActions } from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'

const useStyles = makeStyles(() => ({
  greeting: {
    marginBottom: '2%',
    fontSize: '34px'
  }
}))

const MAX_COMMENTS_PER_PAGE = 9
const SEARCH_CONTEXT = 'COMMENTS'

function MyComments(props) {
  const classes = useStyles()
  const { setCurrentPageContext, resetSearch } = useSearchActions()

  const { fetchSearchedUserComments } = useUserCommentsAsyncActions()
  const comments = useSelector(getSearchedUserComments)

  const sort = useSelector(searchSort)
  const page = useSelector(searchCurrentPage)
  const searchContextName = useSelector(getSearchContext)

  React.useEffect(() => {
    const query = combineUserItemsQueryStrings({
      limit: MAX_COMMENTS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_COMMENTS_PER_PAGE,
      sort
    })

    if (searchContextName !== SEARCH_CONTEXT) {
      resetSearch()
      setCurrentPageContext(SEARCH_CONTEXT)
    }

    const requestComments = async () => {
      await fetchSearchedUserComments(query)
    }

    requestComments()
  }, [sort, page])

  if (!Array.isArray(comments)) return null

  return (
    <>
      <SearchListWrapper
        headerText={`My comments (${comments.length})`}
        sortBy="date"
      >
        <div>List</div>
        <Loader />
      </SearchListWrapper>
    </>
  )
}

export default MyComments
