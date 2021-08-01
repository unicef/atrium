import React from 'react'
import Grid from '@material-ui/core/Grid'
import { RequiredInfoHeader, UploadBanner } from '../components'

const RequiredInformations = ({
  editting,
  attachment,
  setPicture,
  data,
  picture,
  errors,
  handleChange,
  touched,
  setFieldValue
}) => {
  const oldPicture = data && data.url

  return (
    <Grid item container xs={12}>
      <RequiredInfoHeader editting={editting} />
      <UploadBanner
        editting={editting}
        oldPicture={oldPicture}
        picture={picture}
        setPicture={setPicture}
        handleChange={handleChange}
        touched={touched}
        errors={errors}
        attachment={attachment}
        setFieldValue={setFieldValue}
      />
    </Grid>
  )
}

export default RequiredInformations
