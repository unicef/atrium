import React from 'react'
import Grid from '@material-ui/core/Grid'
import { FormTitle, SECTIONS_NAME, FIELDS, SECTIONS_ID } from '../components'
import { InputList } from '../../../molecules'
import { Divider } from '../../../atoms'

const Project = ({ formProps }) => {
  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12}>
        <FormTitle id={SECTIONS_ID[SECTIONS_NAME.PROJECT]}>{SECTIONS_NAME.PROJECT}</FormTitle>
      </Grid>
      <InputList fields={FIELDS[SECTIONS_NAME.PROJECT]} formProps={formProps} />
      <Divider mt="25px" mb="28px" />
    </Grid>
  )
}

export default Project
