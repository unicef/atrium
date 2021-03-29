import React from 'react'
import { LearnQuizSVG } from '../../../assets'
import { SectionWithBorderedText } from '../../../templates'
import { QuizQuestions } from '../components'

const Quiz = () => {
  return (
    <>
      <SectionWithBorderedText
        boxDescription={`Before exploring whether blockchain is the right technology for you, it's important to have a clear understanding of the problem you are trying to solve and the goals you are trying to achieve. 
        Below is a set of questions meant to help determine whether blockchain could be beneficial for solving a specific problem and achieving desired outcomes.`}
        boxTitle="Is blockchain right for you?"
        actionLabel="Start Quiz"
        otherComponent={<LearnQuizSVG />}
        reverse
        hideBorder
      />
      <QuizQuestions />
    </>
  )
}

export default Quiz
