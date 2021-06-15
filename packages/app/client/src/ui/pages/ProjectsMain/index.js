import React from 'react'
import Search from '../Search'
import AddIcon from '@material-ui/icons/Add'
import { ProjectsList, Filters } from './components'
import { useHistory } from 'react-router'
import { Button } from '../../atoms'
import { useIsAuthenticated } from '../../hooks'

const ProjectsMain = () => {
  const history = useHistory()
  const userIsAuthenticated = useIsAuthenticated()

  return (
    <Search
      Menu={Filters}
      List={ProjectsList}
      title="Projects"
      searchBarRightSide={
        userIsAuthenticated ? (
          <Button
            color="primary"
            onClick={() => history.push('/create-projects')}
            size="small"
            endIcon={<AddIcon />}
            ml={15}
          >
            Add projects
          </Button>
        ) : null
      }
    />
  )
}

export default ProjectsMain
