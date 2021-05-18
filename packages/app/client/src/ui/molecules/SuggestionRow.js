import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Avatar } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: props => ({
    padding: 5,
    cursor: props.waitingForMention ? 'default' : 'pointer',
    '&:hover': {
      backgroundColor: props.waitingForMention ? 'transparent' : theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  })
}))

const SuggestionRow = ({ 
  mention, 
  searchValue,
  id,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  role
}) => {
  const waitingForMention = searchValue === ''
  const classes = useStyles({ waitingForMention })
  
  const renderContent = () => {
    if (waitingForMention) {
      return (
        <Grid container alignItems="center" justify="center">
          <CircularProgress size="1.5rem" /> 
        </Grid>
      )
    }

    return (
      <Grid container alignItems="center">
        <Avatar growthTimes={7} {...mention} />
        <Box ml={1}>
          <Typography>{mention.name}</Typography>
        </Box>
      </Grid>
    )
  }

  return (
    <Box
      className={classes.container}
      {...{
        id,
        onMouseDown: waitingForMention ? () => {} : onMouseDown,
        onMouseEnter: waitingForMention ? () => {} : onMouseEnter,
        onMouseUp: waitingForMention ? () => {} : onMouseUp,
        role
      }}
    >
      {renderContent()}
    </Box>
  )
}



export default SuggestionRow
