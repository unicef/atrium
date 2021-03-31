import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import { SectionWithBorderedText } from '../../../templates'
import { QuizQuestions, SectionIcon } from '../components'

const Quiz = () => {
  const [showQuiz, setQuizVisibility] = useState(false);

  const showOrHideQuiz = () => {
    setQuizVisibility((prev) => !prev);
  }

  return (
    <>
      <SectionWithBorderedText
        id="quizSection"
        boxDescription={`Before exploring whether blockchain is the right technology for you, it's important to have a clear understanding of the problem you are trying to solve and the goals you are trying to achieve. 
        Below is a set of questions meant to help determine whether blockchain could be beneficial for solving a specific problem and achieving desired outcomes.`}
        boxTitle="Is blockchain right for you?"
        actionLabel={showQuiz ? "" : "Start Quiz"}
        otherComponent={<SectionIcon iconName="quiz" />}
        reverse
        hideBorder
        onClick={showOrHideQuiz}
        borderedTextFirst
      />
      <Collapse in={showQuiz}>
        <QuizQuestions  hideQuiz={showOrHideQuiz} />
      </Collapse>
    </>
  )
}

export default Quiz
