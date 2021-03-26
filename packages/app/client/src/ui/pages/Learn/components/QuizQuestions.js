import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Title, Subtitle } from '../../../atoms'

const QuizQuestions = () => {
  return (
    <Grid item container xs={12}>
      <Grid item container justify="space-between" xs={12}>
        <Title>
          Questions
        </Title>

        <Subtitle>
          Yes
        </Subtitle>
      </Grid>
    </Grid>
  )
}

export default QuizQuestions
