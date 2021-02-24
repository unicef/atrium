import React from 'react'
import PropTypes from 'prop-types'
import { Trail } from 'react-spring/renderprops'
import withStyles from '@material-ui/styles/withStyles'

import Slide from './Slide'
import Stepper from './Stepper'
import Navigation from './Navigation'

const styles = theme => ({
  root: {
    minHeight: 530
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 60,
    '@media (max-width: 470px)': {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 35,
      '& > *:last-child': {
        marginBottom: 30
      }
    }
  },
  slideWrapper: {
    minHeight: 400,
    '@media (max-width: 1680px)': {
      overflow: 'hidden'
    }
  }
})

const Carousel = ({ classes, list }) => {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const [animateFrom, setAnimateFrom] = React.useState('left')

  const handleNext = async () => {
    setAnimateFrom('left')
    setActiveSlide(prev => prev + 1)
  }

  const handlePrev = () => {
    setAnimateFrom('right')
    setActiveSlide(prev => prev - 1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.menu}>
        <Stepper activeSlide={activeSlide} count={3} />
        <Navigation
          activeSlide={activeSlide}
          count={3}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
      <div className={classes.slideWrapper}>
        <Trail
          items={list.find((obj, k) => k === activeSlide)}
          keys={item => item.key}
          delay={50}
          from={{ marginLeft: animateFrom === 'left' ? 200 : -200, opacity: 0 }}
          to={{ marginLeft: 0, opacity: 1 }}
        >
          {item => props => <Slide trailStyles={props} {...item} />}
        </Trail>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired
    })
  ).isRequired
}

export default withStyles(styles)(Carousel)
