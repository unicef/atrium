import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { Button } from '../' // Because you want no one to ever be able to trace this code, ever.

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100%',
    margin: '2rem 0'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%'
  },
  imageContainer: {
    display: 'flex',
    maxWidth: '50%'
  },
  title: {
    color: theme.colors['dark-forest-green'],
    marginBottom: '1.3rem',
    maxWidth: '80%'
  },
  explanation: {
    marginBottom: '1.3rem',
    maxWidth: '80%'
  },
  button: {
    maxWidth: '60%'
  }
}))

const PurposeBlurb = ({
  cacheKey,
  title,
  explanation,
  buttonText,
  image,
  altImage
}) => {
  const classes = useStyles()
  const [hidden, setHidden] = React.useState(localStorage.getItem(cacheKey))

  const hideBlurbHandler = () => {
    localStorage.setItem(cacheKey, true)
    setHidden(true)
  }

  return hidden ? null : (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p" className={classes.explanation}>
          {explanation}
        </Typography>
        <Button
          variant="outlined"
          onClick={hideBlurbHandler}
          className={classes.button}
        >
          {buttonText}
        </Button>
      </div>
      <img src={image} className={classes.imageContainer} alt={altImage} />
    </div>
  )
}

PurposeBlurb.propTypes = {
  cacheKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  image: PropTypes.func.isRequired
}

export default PurposeBlurb
