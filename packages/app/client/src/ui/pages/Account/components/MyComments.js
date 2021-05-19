import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Loader, SearchListWrapper } from '../../Search/components'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserComments,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import {useUserCommentsAsyncActions, useSearchActions, useHandledRequest} from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import { Comment, CommentBox, CommentList } from '../../../organisms'
import { deleteComment } from '../../../../api/projects'

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

  if (!Array.isArray(comments)) return null

  return (
    <>
      <SearchListWrapper
        headerText={`My comments (${comments.length})`}
        sortBy="date"
      >
        {comments.map((comment, i) => (
          <CommentBox
            removeComment={removeComment}
            userIsTheOwner={comment.user.id === props.id}
            key={comment.id}
            author={comment.user.name}
            {...comment}
          />
        ))}
        <Loader />
      </SearchListWrapper>
    </>
  )
}

export default MyComments
