import React from 'react'
import { CheckboxField, Divider } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
    formLabel: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      margin: 0,
      borderColor: 'red'
    },
    box: {
      paddingRight: 0,
      '& svg': {
        fill: theme.palette.primary.main
      }
    },
    constainer: {
      marginBottom: 5
    }
  })
)

const QuizCheckboxRow = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.constainer}>
      <CheckboxField
        {...props}
        disableRipple
        className={classes.box}
        formLabelProps={{ labelPlacement: "start", className: classes.formLabel }}
      />
      <Divider />
    </div>
  )
}

export default QuizCheckboxRow
