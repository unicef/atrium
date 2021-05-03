import React from 'react'
import { withStyles, Paper } from '@material-ui/core'
import classnames from 'classnames'

const styles = theme => ({
  paperContainer: props => ({
    width: '100%',
    borderRadius: 5,
    backgroundColor: theme.colors[props.bgColor],
    padding: props.padding
  })
})

export const ShadedPaper = withStyles(styles)(
  ({ children, classes, className, ...props }) => {
    const paperClassName = classnames(classes.paperContainer, {
      [className]: Boolean(className)
    })
    return (
      <Paper className={paperClassName} elevation={0} {...props}>
        {children}
      </Paper>
    )
  }
)

ShadedPaper.defaultProps = {
  bgColor: 'light-green',
  padding: '30px 30px 10px 30px'
}
