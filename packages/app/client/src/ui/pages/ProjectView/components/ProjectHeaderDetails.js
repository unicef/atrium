import React from 'react'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'
import { TextButton } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { useTrimmedText } from '../../../hooks'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 32,
    marginBottom: 20,
    marginTop: -10
  }
}))

const ProjectHeaderDetails = ({ details, name }) => {
  const [showFullDetails, setFullDetails] = React.useState(false)
  const trimmedDetails = useTrimmedText({ text: details, max: 205 })
  const shouldRenderShowMoreBtn = details.length >= 205
  const classes = useStyles()
  
  return (
    <Grid item xs={10}>
      <Typography variant="h3" className={classes.title}>{name}</Typography>
      <Typography variant="body1">{showFullDetails ? details : trimmedDetails}</Typography>
      {shouldRenderShowMoreBtn &&
        <TextButton
          textContent={showFullDetails ? 'Show less' : 'Show more'}
          color="primary"
          endIcon={showFullDetails ? <RemoveIcon /> : <AddIcon />}
          onClick={() => setFullDetails(show => !show)}
          mt={20}
        />
      }
    </Grid>
  )
}

export default ProjectHeaderDetails
