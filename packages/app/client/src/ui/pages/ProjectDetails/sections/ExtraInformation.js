import React from 'react'
import Grid from '@material-ui/core/Grid'
import fields from './fields'
import { Divider } from '../../../atoms'
import { ExtraInformationHeader, StoryField, SECTIONS_NAME, FIELDS } from '../components'
import { baseInputsProps } from '../../../../utils/formUtils'

const ExtraInformation = ({ formProps }) => {

  return (
    <Grid item container xs={12} spacing={2}>
      <ExtraInformationHeader />
      {
        FIELDS[SECTIONS_NAME.EXTRA_INFORMATION].map(
          (field) => (
            <StoryField
              setFieldValue={formProps.setFieldValue}
              inputProps={baseInputsProps({ ...field, formProps })}
              label={field.addLabel}
              editingLabel={field.editinglabel}
            />
          )
        )
      }
      
      <Divider mt="25px" mb="28px" />
    </Grid>
  )
}

export default ExtraInformation
