import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles} from '@material-ui/core/styles'
import { Divider } from '../../../atoms'
import { badgesData } from '../../../utils'

const useStyles = makeStyles(() => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '18px'
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '170%',
  }
}))

const BadgeRow = ({ index, showContent }) => {
  const classes = useStyles()
  const dataKey = index + 1
  const { Image, description, title } = badgesData[dataKey]

  return (
    <>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs="auto">
          <Image />
        </Grid>

        {showContent &&
          <Grid item xs>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.description}>{description}</Typography>
          </Grid>
        }
      </Grid>
      {showContent && <Divider variant="fullWidth" mb={21} mt={21}/>}
    </>
  )
}

BadgeRow.defaultProps = {
  showContent: true
}

export default BadgeRow
