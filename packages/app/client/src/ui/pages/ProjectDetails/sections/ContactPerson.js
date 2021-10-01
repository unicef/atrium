import React from 'react'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import { InputList } from '../../../molecules'
import { Divider } from '../../../atoms'
import { FIELDS, SECTIONS_NAME, FormTitle, SECTIONS_ID } from '../components'
import { useSelector } from 'react-redux'
import { getUser } from '../../../../selectors'
 
const ContactPerson = ({ formProps }) => {
  const contactFields = [...FIELDS[SECTIONS_NAME.CONTACT_PERSON]]
  const checkboxField = contactFields.shift()
  const { values, setFieldValue, handleChange } = formProps
  const userIsTheContact = values.iamTheContact
  const user = useSelector(getUser)

  const handleCheck = (e) => {
    if (e.target.checked) {
      setFieldValue('contactPersonFullName', user.name)
      setFieldValue('contactPersonEmail', user.email)
    } else {
      setFieldValue('contactPersonFullName', '')
      setFieldValue('contactPersonEmail', '')
    }
    handleChange(e)
  }

  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12}>
        <FormTitle id={SECTIONS_ID[SECTIONS_NAME.CONTACT_PERSON]}>{SECTIONS_NAME.CONTACT_PERSON}</FormTitle>
      </Grid>

      <Grid item xs={12}>
        <InputList fields={[checkboxField]} formProps={{ ...formProps, handleChange: handleCheck }} />
      </Grid>

      <Grid item xs={12}>   
        <Collapse in={!userIsTheContact} timeout="auto">
          <Grid item container xs={12} spacing={2}>
            <InputList fields={contactFields} formProps={formProps} />
          </Grid>
        </Collapse>
      </Grid>
      <Divider mt="25px" mb="28px" />
    </Grid>
  )
}

export default ContactPerson
