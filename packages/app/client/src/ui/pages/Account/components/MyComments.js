import React, { useState } from 'react'
import { SearchListWrapper } from '../../Search/components'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserComments,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import {
  useUserCommentsAsyncActions,
  useSearchActions,
  useHandledRequest
} from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import { CommentBox } from '../../../organisms'
import { deleteComment } from '../../../../api/projects'
import { EmptyResults } from '../../../molecules'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const MAX_COMMENTS_PER_PAGE = 9
const SEARCH_CONTEXT = 'COMMENTS'

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '5%'
  }
}))

function MyComments(props) {
  const classes = useStyles()
  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const history = useHistory()

  const { fetchSearchedUserComments } = useUserCommentsAsyncActions()
  const comments = useSelector(getSearchedUserComments)
  const handledRequest = useHandledRequest()

  const sort = useSelector(searchSort)
  const page = useSelector(searchCurrentPage)
  const searchContextName = useSelector(getSearchContext)
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
        handleClick={() => history.push('projects')}
        buttonProps={{ className: classes.button }}
      />
    )

  return (
    <SearchListWrapper
      headerText={`My comments (${comments.length})`}
      sortBy="date"
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
    </SearchListWrapper>
  )
}

export default MyComments
