import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  talkbubble: ({ breakpoint, width, height, bgColor }) => ({
    width,
    height,
    padding: '15px 25px 15px 25px',
    background: theme.colors[bgColor],
    position: 'relative',
    borderRadius: '5px',
    [theme.breakpoints.down(breakpoint)]: {
      right: 0,
      left: 0
    },
    zIndex: 2
  }),
  triangle: ({ top, breakpoint, bgColor }) => {
    const placement = top !== undefined ? {
      top: 0,
      borderTop: `20px solid ${theme.colors[bgColor]}`,
    } : {
      bottom: 0,
      borderBottom: `20px solid ${theme.colors[bgColor]}`
    }

    return {
      position: 'absolute',
      left: -15,
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
     ...placement,
      [theme.breakpoints.down(breakpoint)]: props => ({
        left: '45%',
        right: 0,
        top: -15,
        borderTop: 0,
        borderBottom: `20px solid ${theme.colors[props.bgColor]}`
      })
    }
  },
  container: ({ top, bottom, left, breakpointTopDistance, breakpoint, right }) => {
    const verticalPlacement = { top, bottom }
    const horizontalPlacement = { left, right }

    return {
      position: 'absolute',
      [theme.breakpoints.down(breakpoint)]: {
        display: 'flex',
        left: 0,
        right: 0,
        top: breakpointTopDistance,
        justifyContent: 'center'
      },
      ...verticalPlacement,
      ...horizontalPlacement
    }
  }
}))

const ChatBubbleShape = (props) => {
  const classes = useStyles(props)

  return (
    <div className={classes.container}>
      <div className={classes.talkbubble}>
        <div className={classes.triangle} />
        {props.children}
      </div>
    </div>
  )
}

ChatBubbleShape.defaultProps = {
  breakpointTopDistance: 100,
  width: 269,
  height: 161,
  breakpoint: 'md',
  bgColor: 'blue-info'
}

export default ChatBubbleShape
