import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import UpdateEdition from './UpdateEdition'
import { makeStyles } from '@material-ui/core/styles'
import { HorizontalCardWithMenu, DeleteActionDialog } from '../../../../organisms'
import { UserLink } from '../../../../organisms'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../../../selectors'
import { getRelativeTimeToNow } from '../../../../../utils/timeManipulation'
import { ShowMoreButton } from '../../../../atoms'
import { useProjectsAsyncActions } from '../../../../hooks'

const useStyles = makeStyles(theme => ({
  text: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%'
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: '21px',
    marginBottom: 8,
    textDecoration: 'underline'
  },
  greyText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '180%',
    color: '#636767'
  },
  dot: {
    color: theme.colors['black-three'],
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: '1em'
  }
}))

const UpdateCard = ({ owner, text, title, date, year, month, id }) => {
  const [editMode, setEditMode] = React.useState(false)
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const userId = useSelector(getUserId)
  const userIsTheOwner = owner.id === userId
  const classes = useStyles()
  const { deleteUpdate } = useProjectsAsyncActions()

  const menuItems = [
    {
      label: 'Edit',
      handleClick: () => setEditMode(true)
    },
    {
      label: 'Delete',
      handleClick: async () => {
        setDeletionModalVisibility(true)
      }
    }
  ]

  return (
    <>
      <HorizontalCardWithMenu
        menuItems={menuItems}
        userIsTheOwner={userIsTheOwner}
      >
        <Typography className={classes.title}>
          {title}
        </Typography>

        <Box display="flex" mb={1}>
          <Typography className={classes.greyText}>
              Uploaded by
          </Typography>
          <UserLink
            id={owner.id}
            color="black-three"
            name={`${owner.name || 'test'}`}
          />
          <Typography className={classes.dot}>
            ·
          </Typography>
          <Typography className={classes.greyText}>
            {`${getRelativeTimeToNow(date)} ago`}
          </Typography>
        </Box>

        <Box mb={1}>
          {editMode ?
            <UpdateEdition dismissEdit={() => setEditMode(false)} text={text} year={year} month={month} id={id} />
            :
            <Typography className={classes.text}>
              {text}
            </Typography>
          }
        </Box>

        <Grid container item xs={12} alignItems="center">
          {!editMode && <ShowMoreButton />}
        </Grid>
      </HorizontalCardWithMenu>
      <DeleteActionDialog
        open={showDeletionModal}
        handleClose={() => setDeletionModalVisibility(false)}
        onConfirm={() => { deleteUpdate({ year, month, id }) }}
      />
    </>
  )
}

export default UpdateCard
