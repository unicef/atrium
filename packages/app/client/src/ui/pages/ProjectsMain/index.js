import React, { useEffect } from 'react'
import Search from '../Search'
import AddIcon from '@material-ui/icons/Add'
import { ProjectsList, Filters } from './components'
import { useHistory } from 'react-router'
import { Button } from '../../atoms'
import { useIsAuthenticated } from '../../hooks'

const ProjectsMain = () => {
  const history = useHistory()
  const userIsAuthenticated = useIsAuthenticated()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Search
      Menu={Filters}
      List={ProjectsList}
      title="Projects"
      searchBarRightSide={
        <Button
          color="primary"
          onClick={() => {
            userIsAuthenticated
              ? history.push('/create-projects')
              : history.push('/login')
          }}
          size="small"
          endIcon={<AddIcon />}
          ml={15}
        >
          Add projects
        </Button>
      }
    />
  )
}

export default ProjectsMain
