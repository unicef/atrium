import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Title, Subtitle } from '../../../atoms'
import { TwoPartySection } from '../../../templates'

const QuizQuestions = () => {
  const headerPartiesPositioning = { justify: 'flex-end' }
  return (
    <TwoPartySection
      partiesContainerProps={[headerPartiesPositioning, headerPartiesPositioning]}
    >
        <Title>
          Questions
        </Title>

        <Subtitle>
          Yes
        </Subtitle>
    </TwoPartySection>
  )
}

export default QuizQuestions
