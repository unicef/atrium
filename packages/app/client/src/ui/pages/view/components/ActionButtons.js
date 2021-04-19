import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button } from '../../../atoms'
import { currentUserIsTheOwner } from '../../../../selectors'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const OwnerButtons = ({ onEdit, projectData }) => {
  const history = useHistory()
  console.log(projectData)
  return (
    <>
      <Button
        mb={20}
        size="full"
        color="primary"
        onClick={() => {
          history.push(`/project-overview/${projectData.id}`)
        }}
      >
        Edit
      </Button>
      <Button size="full"  variant="outlined">
        Comments
      </Button>
    </>
  )
}

const OtherUsersButtons = () => {
  return (
    <Grid container>
      <Button color="primary">
        Like
      </Button>

      <Button variant="outlined">
        Comments
      </Button>

      <Button variant="outlined">
        Bookmarks
      </Button>
    </Grid>
  )
}

const ActionButtons = ({ projectData }) => {
  const userIsTheOwner = useSelector(currentUserIsTheOwner)
  
  return userIsTheOwner ? <OwnerButtons projectData={projectData} /> : <OtherUsersButtons />
}

export default ActionButtons
