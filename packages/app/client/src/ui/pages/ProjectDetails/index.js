import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Formik } from 'formik'
import { RequiredInformations } from './sections'

const ProjectDetails = ({ editting = false }) => {
  const [picture, setPicture] = useState(null)

  return (
    <Grid container>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        validate={() => {}}
        onSubmit={() => {}}
      >
        {(
          {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
            isValid,
            dirty,
            validateForm,
          }
        ) => (
          <RequiredInformations
            editting={editting}
            attachment={values.attachment}
            setPicture={setPicture}
            data={{}}
            picture={picture}
            errors={errors}
            handleChange={handleChange}
            touched={touched}
            setFieldValue={setFieldValue}
          />
        )}
      </Formik>
      
    </Grid>
  )
}

export default ProjectDetails
