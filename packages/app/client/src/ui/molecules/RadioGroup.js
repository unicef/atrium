import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import { Radio } from '../atoms'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  label: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '16px',
    color: theme.colors.black,
    marginBottom: '8px'
  },
  errorMessage: {
    marginLeft: 0,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.error.main
  }
}))

const _RadioGroup = ({
  inputs,
  error,
  name,
  value,
  onChange,
  ariaLabel,
  errorMessage,
  helperText,
  label
}) => {
  const classes = useStyles()

  return (
    <FormControl component="fieldset">
      <FormLabel className={classes.label} component="legend">{label}</FormLabel>
      <RadioGroup row aria-label={ariaLabel} name={name} value={value || ''} onChange={onChange}>
        {inputs.map(
          (input) => (
            <Radio key={input.id} {...input} />
          )
        )}
      </RadioGroup>
      <FormHelperText className={classes.errorMessage}>{error ? errorMessage : helperText}</FormHelperText>
    </FormControl>
  )
}

export default _RadioGroup