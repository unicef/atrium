import React from 'react'
import { withStyles, Paper } from '@material-ui/core'
import classnames from 'classnames'

const styles = theme => ({
  paperContainer: {
    width: 639,
    borderRadius: 5,
    backgroundColor: theme.colors['light-green'],
    padding: 30
  }
})

export const ShadedPaper = withStyles(styles)(
  ({ children, classes, className, ...props }) => {
    const paperClassName = classnames(classes.paperContainer, {
      [className]: !!className
    })
    return (
      <Paper className={paperClassName} elevation={0} {...props}>
        {children}
      </Paper>
    )
  }
)
