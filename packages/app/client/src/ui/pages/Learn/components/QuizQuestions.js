import React, { useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import QuizCheckboxRow from './QuizCheckboxRow'
import QuizResult from './QuizResult'
import { Title, Subtitle, Button } from '../../../atoms'
import { SectionContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'
import { TextWithLinks } from '../../../molecules'

const useStyles = makeStyles(theme => 
  ({
    footer: {
      marginTop: 40,
      [theme.breakpoints.only('sm')]: {
        marginTop: 160
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 190
      }
    }
  })
)

const labels = [
  'Does the solution require a database?',
  'Will there be multiple writers updating/inputting information?',
  'Is there a lack of trust among participants?',
  'Is there a lack of a trusted intermediary?',
  'Can a consistent set of rules help achieve the outcome?',
  'WIll governing rules be consistent over time?',
  'Is transparency of the transactions an important feature?',
  'Is an immutable, auditable record of transactions important?',
  'Are transactions dependent or interrelated?',
  'Can a distributed infrastructure reduce the risk of censorship or attack?'
]

const checkboxProps = {
  name: 'quizCheckbox',
  initialValue: false,
  contentPlacemet: 'flex-start',
  htmlFor: 'quizCheckbox',
  type: 'checkbox'
}

const QuizQuestions = ({ hideQuiz }) => {
  const classes = useStyles()
  const [checkedQuestions, setChecked] = useState([])

  const handleChange = useCallback((index) => () => {
    setChecked((questions) => {
      if (questions.indexOf(index) >= 0) {
        return questions.filter(q => q !== index)
      }

      return [...questions, index]
    })
  }, [])

  return (
    <SectionContainer padding="0 80px 80px 80px">
      <Grid item container justify="space-between" alignItems="center" xs={12} md={8}>
        <div>
          <Title>
            Questions
          </Title>
        </div>
        
        <div>
          <Subtitle>
            Yes
          </Subtitle>
        </div>
        <Grid item xs={12}>
          {labels.map((label, index) => (
            <QuizCheckboxRow
              {...checkboxProps}
              id={`quizCheckbox${index}`}
              key={`quizCheckbox_${index}`}
              label={label}
              onChange={handleChange(index)}
            />
          ))}
         
        </Grid>
      </Grid>
      <QuizResult checkedQuestions={checkedQuestions} labels={labels} />
      <Grid className={classes.footer} item container xs={12}>
        <Button
          color="primary"
          onClick={ hideQuiz}
        >
          Hide Quiz
        </Button>

        <Grid item xs={12}>
          <TextWithLinks
            mt={50}
            links={[ { str: "Practical Guide", to: ""}]}
          >
            Not sure how to answer these questions? Refer to the UNIN Practical Guide for more context.
          </TextWithLinks>
        </Grid>
      </Grid>
  </SectionContainer>
  )
}

export default QuizQuestions
