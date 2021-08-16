import React from 'react'
import Grid from '@material-ui/core/Grid'
import { RequiredInfoHeader, UploadBanner, FIELDS, SECTIONS_NAME } from '../components'
import { InputList } from '../../../molecules'
import { Divider } from '../../../atoms'
import fields from './fields'

const RequiredInformations = ({
  editing,
  setPicture,
  data,
  picture,
  formProps
}) => {
  const oldPicture = data && data.url

  return (
    <Grid item container xs={12} spacing={2}>
      <RequiredInfoHeader editing={editing} />
      <UploadBanner
        editing={editing}
        oldPicture={oldPicture}
        picture={picture}
        setPicture={setPicture}
        handleChange={formProps.handleChange}
        touched={formProps.touched.attachment}
        errors={formProps.errors.attachment}
        attachment={formProps.values.attachment}
        setFieldValue={formProps.setFieldValue}
      />
      <InputList fields={FIELDS[SECTIONS_NAME.REQUIRED_INFORMATIONS]} formProps={formProps} />
      <Divider mt="25px" mb="28px" />
    </Grid>
  )
}

export default RequiredInformations
