import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TabContentTitle, ProfileProjectsList } from '../components'
import { SearchPaginatedList } from '../../../templates'
import { useProfileAsyncActions, useQueryParams } from '../../../hooks'
import { useSelector } from 'react-redux'
import { getProfileProjecsPageCounter } from '../../../../selectors'

const MAX_PROJECTS_PER_PAGE = 9

const ProfileProjects = () => {
  const { getProjects } = useProfileAsyncActions()
  const { onChangeParam, getString, getEntriesObj } = useQueryParams()
  const { page } = getEntriesObj()
  const pageCounter = useSelector(getProfileProjecsPageCounter)

  React.useEffect(() => {
    const enhacedQuery = getString({
      enhanced: true,
      pageLimit: MAX_PROJECTS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_PROJECTS_PER_PAGE
    })
    getProjects(`?${enhacedQuery}`)
  }, [page])

  return (
    <Grid container justify="center">
      <Grid container item xs={12}>
        <TabContentTitle>PROJECTS</TabContentTitle>
        <SearchPaginatedList
          currentpage={page}
          onChangeParam={onChangeParam}
          numberOfPages={pageCounter}
        >
          <ProfileProjectsList />
        </SearchPaginatedList>
      </Grid>
    </Grid>
  )
}

export default ProfileProjects
