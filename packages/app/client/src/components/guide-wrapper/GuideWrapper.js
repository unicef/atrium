import React from 'react'
import ReactDOM from 'react-dom'
import { compose } from 'recompose'
import FocusLock from 'react-focus-lock'
import { connect } from 'react-redux'
import { animateScroll } from 'react-scroll'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'
import axios from 'axios'
import { Button, CancelGreenIcon } from '../../ui'
import {
  projectGuideSteps,
  learnGuideSteps,
  pollGuideSteps
} from './list-of-guides'

const styles = theme => ({
  circleWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden'
  },
  circle: {
    position: 'fixed',
    backgroundColor: 'transparent',
    border: `2px solid ${theme.colors['shamrock-green']}`,
    borderRadius: '50%',
    zIndex: 101
  },
  root: {
    position: 'absolute',
    top: 50,
    height: '100%',
    width: '100%',
    zIndex: 102
  },
  closeIcon: {
    width: 25,
    height: 25
  },
  guideContainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    width: 'auto',
    minHeight: 204,
    padding: '16px 10px',
    backgroundColor: '#aaffc8',
    overflow: 'hidden',
    '& > button': {
      position: 'absolute',
      right: 10,
      top: 10,
      fontSize: 12,
      color: `${theme.colors['shamrock-green']} !important`
    },
    '@media (max-width: 600px)': {
      paddingBottom: 80,
      '& > button': {
        top: 'initial',
        right: 0,
        bottom: 16
      }
    }
  },
  guideContent: {
    padding: '0 50px',
    '& > p': {
      marginBottom: 5
    },
    '@media (max-width: 959px)': {
      '& > p:first-child': {
        paddingRight: '20%'
      }
    },
    '@media (max-width: 600px)': {
      padding: '0 5px',
      '& > p:first-child': {
        paddingRight: 'initial'
      }
    }
  },
  nextBtnWrapper: {
    marginTop: 40,
    '& > button': {
      minWidth: 115
    },
    '@media (max-width: 600px)': {
      marginTop: 0,
      position: 'absolute',
      bottom: 20
    }
  }
})

const scrollTo = value => {
  animateScroll.scrollTo(value, { duration: 300 })
}

const calcCirclePosition = element => {
  // get the size of the element and position relative to the viewport.
  const { top, left, width } = element.getBoundingClientRect()

  // set uniform circle size
  const circleWidth = width * 1.3
  const circleHeight = width * 1.3

  const marginTop = window.scrollY + top // get top position from 0 of page and if scrolling
  const circleHeightDifference = circleHeight / 2.5 // take height to center the circle around the element
  const circleWidthDifference = (circleWidth - width) / 1.9 // take width to center the circle around the element

  const style = {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 260,
    maxHeight: 260,
    width: circleWidth,
    height: circleHeight,

    // set the position of the circle in the center around the element
    top: marginTop - circleHeightDifference,
    left: left - circleWidthDifference
  }

  return { style, marginTop }
}

/**
 *
 * @returns [function] allow - set to the <body /> = overflow: initial;
 * @returns [function] disallow - set to the <body /> = overflow: hidden;
 */
const pageScrolling = {
  element: document.getElementsByTagName('body')[0],
  allow: function () {
    this.element.removeAttribute('style', 'overflow: hidden;')
  },
  disallow: function () {
    this.element.setAttribute('style', 'overflow: hidden;')
  }
}

/**
 *
 * @param {string} path of the current route
 * @returns {array} array of steps
 */
const getGuideByPathPage = path => {
  return {
    '/learn': learnGuideSteps,
    '/engage': pollGuideSteps,
    '/view-projects': projectGuideSteps
  }[path]
}

export const guideWrapper = WrappedComponent => {
  /**
  |--------------------------------------------------
  | TODO:

    if (props.auth.guideCompleted) {
      return () => <WrappedComponent />
    }
  |--------------------------------------------------
  */

  class Guide extends React.Component {
    constructor(props) {
      super(props)
      const guideSteps = getGuideByPathPage(props.match.path)

      this.state = {
        guideSteps,
        actualStep: guideSteps[0],
        stepIndex: 0,
        stepCount: +guideSteps.length,
        isGuideCompleted: this.checkIfGuidesAreCompleted(
          props.auth.user.learnPageFlag,
          props.auth.user.explorePageFlag,
          props.auth.user.engagePageFlag,
          props.match.path
        ),
        circleProps: null,
        path: props.match.path
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateCirclePosition)
    }

    componentDidUpdate(prevProps, prevState) {
      const { actualStep, isGuideCompleted, circleProps } = this.state

      if (prevState.actualStep !== actualStep && actualStep.elementId) {
        this.drawCircle()
      } else if (
        circleProps &&
        (!actualStep.elementId ||
          !document.getElementById(actualStep.elementId))
      ) {
        // if a circle exists and the next step has an empty elementId or element is undefined
        this.removeCircle()
      }

      if (!prevState.isGuideCompleted && isGuideCompleted) {
        pageScrolling.allow()
      }
    }

    componentWillUnmount() {
      pageScrolling.allow()

      window.removeEventListener('resize', this.updateCirclePosition)
    }

    drawCircle = () => {
      const elemId = this.state.actualStep.elementId
      const element = document.getElementById(elemId)

      this.setState({ circledElement: element }, () =>
        this.updateCirclePosition()
      )
    }

    removeCircle = () => {
      this.setState({ circledElement: null, circleProps: null })
    }

    updateCirclePosition = () => {
      const { circledElement } = this.state
      if (!circledElement) {
        return
      }

      const { style, marginTop } = calcCirclePosition(circledElement)

      this.setState({ circleProps: style }, () => {
        scrollTo(marginTop - 150)
      })
    }

    setCompletedGuide = () => {
      if (this.state.path === '/learn') {
        axios
          .post(`users/update-learn-flag/${this.props.auth.user.id}`)
          .then(res => res)
          .catch(err => {
            console.log(err)
          })
      }
      if (this.state.path === '/engage') {
        axios
          .post(`users/update-engage-flag/${this.props.auth.user.id}`)
          .then(res => res)
          .catch(err => {
            console.log(err)
          })
      }
      if (this.state.path === '/view-projects') {
        axios
          .post(`users/update-explore-flag/${this.props.auth.user.id}`)
          .then(res => res)
          .catch(err => {
            console.log(err)
          })
      }

      this.setState({ isGuideCompleted: true })
    }

    checkIfGuidesAreCompleted = (
      learnPageFlag,
      explorePageFlag,
      engagePageFlag,
      path
    ) => {
      switch (path) {
        case '/learn':
          return learnPageFlag
        case '/engage':
          return engagePageFlag
        case '/view-projects':
          return explorePageFlag
        default:
          return false
      }
    }

    handleNextStep = () => {
      const { guideSteps, stepIndex, stepCount } = this.state
      const nextIndex = stepIndex + 1

      if (nextIndex === stepCount) {
        return this.setCompletedGuide()
      }

      const nextActualStep = guideSteps.find((k, index) => index === nextIndex)
      this.setState({
        stepIndex: nextIndex,
        actualStep: nextActualStep
      })
    }

    render() {
      const {
        guideSteps,
        circleProps,
        actualStep,
        stepCount,
        stepIndex
      } = this.state
      const { classes } = this.props

      const isLastStep = stepIndex + 1 === stepCount
      const hasOnlyOneStep = guideSteps.length === 1
      const nextStepButtonChildren = hasOnlyOneStep
        ? 'Got it'
        : isLastStep
          ? 'Complete tour'
          : 'Next'

      const viewCircle =
        circleProps &&
        React.createElement(
          'div',
          { className: classes.circleWrapper },
          <span style={circleProps} className={classes.circle} />
        )

      const viewCompleteGuideButton = !isLastStep && (
        <Button
          type="button"
          size="mini"
          variant="text"
          onClick={this.setCompletedGuide}
        >
          end intro <CancelGreenIcon className={classes.closeIcon} />
        </Button>
      )

      const viewGuideComponent = (
        <>
          {viewCircle}
          <FocusLock className={classes.root} autoFocus={false}>
            <div
              role="dialog"
              aria-modal="true"
              className={classes.guideContainer}
            >
              {viewCompleteGuideButton}
              <Grid
                container
                direction="column"
                className={classes.guideContent}
              >
                <Typography component="p" variant="h4">
                  {actualStep.title}
                </Typography>
                <Typography component="p" variant="body1">
                  {actualStep.desc}
                </Typography>
                <Grid item className={classes.nextBtnWrapper}>
                  <Button
                    type="button"
                    size="mini"
                    variant="outlined"
                    tabIndex={1}
                    onClick={this.handleNextStep}
                  >
                    {nextStepButtonChildren}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </FocusLock>
        </>
      )
      const body = document.getElementsByTagName('body')[0]
      return (
        <>
          <WrappedComponent />
          {this.state.isGuideCompleted
            ? null
            : ReactDOM.createPortal(viewGuideComponent, body)}
        </>
      )
    }
  }
  const mapStateToProps = state => ({
    auth: state.auth
  })
  return compose(
    withStyles(styles),
    connect(mapStateToProps),
    React.memo
  )(Guide)
}
