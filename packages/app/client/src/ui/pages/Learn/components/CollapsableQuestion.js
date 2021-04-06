import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
    container: props => ({
      border: `1.2px solid ${props.showAnswer ? theme.palette.primary.main : '#BCBEBE'}`,
      borderRadius: 5,
      marginBottom: 20
    }),
    answerWrapper: props => ({
      borderTopColor: props.showAnswer ? theme.palette.primary.main : '#BCBEBE',
      borderTopStyle: 'solid',
      borderTopWidth: '1.2px'
    }),
    question: props => ({
      color: props.showAnswer ? theme.palette.primary.main : theme.palette.text.primary
    })
  })
)

const CollapsableQuestion = ({ title, answer }) => {
  const [showAnswer, setAsnwerVisibility] = useState(false)
  const classes = useStyles({ showAnswer })

  return (
    <Grid item alignItems="center" container xs={12} className={classes.container}>
      <IconButton
        color={showAnswer ? 'primary' : '#BCBEBE'}
        aria-label="upload upward"
        component="span"
        onClick={() => setAsnwerVisibility(!showAnswer)}
      >
        {showAnswer ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
      <Grid item xs={10}>
        <Typography className={classes.question}>{title}</Typography>
      </Grid>
      <Collapse in={showAnswer} className={classes.answerWrapper}>
        <Grid container style={{ padding: 25 }} zeroMinWidth item xs={12}>
          {answer}
        </Grid>
      </Collapse>
    </Grid>
  )
}

export default CollapsableQuestion
