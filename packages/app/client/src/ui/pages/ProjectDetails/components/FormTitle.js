import React from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'

const FormTitle = withStyles((theme) =>(
  {
    root: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '22px',
      lineHeight: '27px',
      margin: '20px 0 10px',
      fontFamily: theme.typography.fontFamily
    }
  })
)(Typography)

export default FormTitle
