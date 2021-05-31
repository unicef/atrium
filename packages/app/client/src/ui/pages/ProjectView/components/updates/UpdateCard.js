import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import UpdateEdition from './UpdateEdition'
import { makeStyles } from '@material-ui/core/styles'
import { HorizontalCardWithMenu, ActionDialog } from '../../../../organisms'
import { CardInfoRow } from '../../../../molecules'
import { UserLink } from '../../../../organisms'
import { useSelector } from 'react-redux'
import { getUserId, getCurrentProjectId } from '../../../../../selectors'
import { getRelativeTimeToNow } from '../../../../../utils/timeManipulation'
import { ShowMoreButton } from '../../../../atoms'
import { useProjectsAsyncActions, useTrimmedText } from '../../../../hooks'

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

const TEXT_MAX_LENGTH = 200

const UpdateCard = ({ owner, text, title, date, year, month, id }) => {
  const classes = useStyles()
  const [editMode, setEditMode] = React.useState(false)
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const [showTheCompleteText, setTextVisibility] = React.useState(false)

  const { deleteUpdate, getProjectById } = useProjectsAsyncActions()
  const trimmedText = useTrimmedText({ text, max: TEXT_MAX_LENGTH })

  const projectId = useSelector(getCurrentProjectId)
  const userId = useSelector(getUserId)

  const userIsTheOwner = owner.id === userId
  const textContent = showTheCompleteText ? text : trimmedText
  const showMoreButtonVisible = !editMode && text.length > TEXT_MAX_LENGTH

  const menuItems = [
    {
      label: 'Edit',
      handleClick: () => setEditMode(true)
    },
    {
      label: 'Delete',
      handleClick: () => {
        setDeletionModalVisibility(true)
      }
    }
  ]

  return (
    <Box mb={2} width="100%">
      <HorizontalCardWithMenu
        menuItems={menuItems}
        userIsTheOwner={userIsTheOwner}
      >
        <Typography className={classes.title}>
          {title}
        </Typography>

        <Box display="flex" mb={1}>
          <CardInfoRow
            components={[
              {
                type: 'authorship',
                author: owner.name
              },
              {
                type: 'date',
                variant: 'absolute',
                date
              }
            ]}
          />
        </Box>

        <Box mb={1}>
          {editMode ?
            <UpdateEdition dismissEdit={() => setEditMode(false)} text={text} year={year} month={month} id={id} />
            :
            <Typography className={classes.text}>
              {textContent}
            </Typography>
          }
        </Box>

        <Grid container item xs={12} alignItems="center">
          {showMoreButtonVisible && <ShowMoreButton isShowingMore={showTheCompleteText}  handleClick={() => setTextVisibility(show => !show)} />}
        </Grid>
      </HorizontalCardWithMenu>
      <ActionDialog
        open={showDeletionModal}
        handleClose={() => setDeletionModalVisibility(false)}
        onConfirm={async () => {
          await deleteUpdate(id)
          setDeletionModalVisibility(false)
          await getProjectById(projectId)
        }}
      />
    </Box>
  )
}

export default UpdateCard
