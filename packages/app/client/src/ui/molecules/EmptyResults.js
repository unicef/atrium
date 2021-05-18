import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '../atoms'

const useStyles = makeStyles(() => ({
  icon: {
    width: '5em',
    height: '5em'
  },
  mainText: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: '140%',
  },
  secondaryText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '140%',
  }
}))

const EmptyResults = ({
  handleClick,
  buttonLabel,
  height,
  mainMessage,
  suggestiontext,
  containerProps,
  buttonProps
}) => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      width="100%"
      height={height}
      alignItems="center"
      flexDirection="column"
      {...containerProps}
    >
      <Box mt={5}>
        <Typography className={classes.mainText}>{mainMessage}</Typography>
      </Box>
      {suggestiontext &&
        <Box mt={2} mb={3}>
          <Typography className={classes.secondaryText}>{suggestiontext}</Typography>
        </Box>
      }
      
      {Boolean(handleClick) && 
        <Button
          color="primary"
          onClick={handleClick}
          {...buttonProps}
        >
          {buttonLabel}
        </Button>
      }
    </Box>
  )
}

EmptyResults.defaultProps = {
  height: '100%'
}

export default EmptyResults
