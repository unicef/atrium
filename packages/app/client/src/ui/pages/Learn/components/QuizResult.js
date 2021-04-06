import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ChatBubbleShape } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
    container: {
      position: 'relative',
      color: theme.palette.primary.contrastText
    }
  })
)

const QuizResult = ({ checkedQuestions, labels }) => {
  const classes = useStyles()
  const positiveResult = checkedQuestions.length === labels.length

  return (
    <Grid xs={12} md={4} className={classes.container}>
      <ChatBubbleShape bgColor={positiveResult ? 'shamrock-green' : 'dark-gray'} left={40} bottom={5} breakpointTopDistance={20} breakpoint="sm">
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Results:
            </Typography>
          </Grid>
          <div>
            <Typography variant="h2">
              {positiveResult ? 'YES' : 'NO'}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {positiveResult ? 'You probably need blockchain' : 'You probably don’t need blockchain'}
          </Typography>
        </Grid>
      </ChatBubbleShape>
    </Grid>
  )
}

export default QuizResult
