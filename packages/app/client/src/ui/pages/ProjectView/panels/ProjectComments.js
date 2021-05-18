import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CommentsList, CreateComment } from '../components/comments'
import { SearchPaginatedList } from '../../../templates'
import { useProjectsAsyncActions, useQueryParams } from '../../../hooks'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { getProjectCommentsLength, getProjectCommentsPageCount } from '../../../../selectors'

const MAX_COMMENTS_PER_PAGE = 4

const ProjectComments = () => {
  const { getComments } = useProjectsAsyncActions()
  const { onChangeParam, getString, getEntriesObj } = useQueryParams()
  const { id } = useParams()
  const { sort, page } = getEntriesObj()
  const commentsLength = useSelector(getProjectCommentsLength)
  const commentsPageCounter = useSelector(getProjectCommentsPageCount)

  React.useEffect(() => {
    const enhacedQuery = getString({
      enhanced: true,
      pageLimit: MAX_COMMENTS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_COMMENTS_PER_PAGE
    })
    getComments(id, enhacedQuery)
  }, [sort, page])

  const onRefreshList = () => {
    const enhacedQuery = getString({
      enhanced: true,
      pageLimit: MAX_COMMENTS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_COMMENTS_PER_PAGE
    })

    getComments(id, enhacedQuery)
  }

  return (
    <Grid container justify="center">
      <Grid container item xs={10}>
        <CreateComment refreshComments={onRefreshList} />
        <SearchPaginatedList
          currentpage={page}
          onChangeParam={onChangeParam}
          getString={getString}
          numberOfPages={commentsPageCounter}
          withHeader
          headerProps={
            {
              withPrefix: false,
              name: `Comments(${commentsLength})`,
              sortDirection:sort,
              sortBy: "Popular"
            }
          }
        >
          <CommentsList refreshComments={onRefreshList} />
        </SearchPaginatedList>
      </Grid>
    </Grid>
  )
}

export default ProjectComments
