import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  slide: {
    display: 'flex',
    width: '100%'
  },
  descriptionContainer: {
    maxWidth: 490,
    '@media (max-width: 959px)': {
      maxWidth: 'initial'
    }
  },
  descriptionOfSlide: {
    marginBottom: 18,
    color: theme.colors['dark-forest-green']
  },
  imageContainer: {
    paddingRight: '0 !important',
    display: 'flex',
    justifyContent: 'flex-end',
    '@media (max-width: 959px)': {
      justifyContent: 'center'
    }
  },
  imageOfSlide: {
    width: '100%',
    maxWidth: 620,
    objectFit: 'contain'
  }
})

const Slide = ({ trailStyles, classes, title, text, imgSrc }) => (
  <div className={classes.slide} style={trailStyles}>
    <Grid container spacing={10}>
      <Grid item sm={12} md={5} className={classes.descriptionContainer}>
        <Typography
          component="h4"
          variant="h4"
          className={classes.descriptionOfSlide}
        >
          {title}
        </Typography>
        <Typography>{text}</Typography>
      </Grid>
      <Grid item sm={12} md={7} className={classes.imageContainer}>
        <img
          src={imgSrc}
          alt={`${title} figure`}
          className={classes.imageOfSlide}
        />
      </Grid>
    </Grid>
  </div>
)

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(Slide)
