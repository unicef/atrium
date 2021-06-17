import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getNumberOfPages,
  getSearchContext,
  getSearchedUserComments
} from '../../../../selectors'
import {
  useUserCommentsAsyncActions,
  useSearchActions,
  useHandledRequest,
  useQueryParams
} from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import { CommentBox } from '../../../organisms'
import { deleteComment } from '../../../../api/projects'
import { EmptyResults } from '../../../molecules'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { SearchPaginatedList } from '../../../templates'

const MAX_COMMENTS_PER_PAGE = 9
const SEARCH_CONTEXT = 'COMMENTS'

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '5%'
  }
}))

function MyComments(props) {
  const classes = useStyles()
  const history = useHistory()

  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const { onChangeParam, getString, getEntriesObj } = useQueryParams()
  const { fetchSearchedUserComments } = useUserCommentsAsyncActions()
  const { sort = 'asc', page } = getEntriesObj()

  const comments = useSelector(getSearchedUserComments)
  const pagesCounter = useSelector(getNumberOfPages)
  const searchContextName = useSelector(getSearchContext)

  const handledRequest = useHandledRequest()
  const [trigger, setTrigger] = useState(false)

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
  }, [sort, page, trigger])

  const removeComment = handledRequest({
    request: deleteComment,
    showFullPageLoading: true,
    onSuccess: () => {
      setTrigger(!trigger)
    },
    successMessage: 'Comment successfully deleted'
  })

  if (!Array.isArray(comments) || comments.length === 0)
    return (
      <EmptyResults
        mainMessage="You don’t have any comments yet"
        buttonLabel="Add comment"
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
        name: `My comments (${comments.length})`,
        sortDirection: sort,
        sortBy: 'Date'
      }}
    >
      {comments.map(comment => (
        <CommentBox
          removeComment={removeComment}
          userIsTheOwner={comment.user.id === props.id}
          key={comment.id}
          author={comment.user.name}
          {...comment}
        />
      ))}
    </SearchPaginatedList>
  )
}

export default MyComments
