import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const CustomCheckbox = ({ value, label, ...props }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked={value}
          {...props}
        />
      }
      label={label}
    />
  )
}

export default CustomCheckbox