import React from 'react'
import Form from './Form'
import { TitleAndSubtitle } from '../molecules'
import Grid from '@material-ui/core/Grid'

const SimpleFormWithHeader = (props) => {
  return (
    <Grid item xs={12}>
      <TitleAndSubtitle
        subtitle={props.subtitle}
        title={props.title}
        subtitleAlign={props.subtitleAlign}
        subtitleAlignMobile={props.subtitleAlignMobile}
        titleAlign={props.titleAlign}
        titleAlignMobile={props.titleAlignMobile}
      />

      <Form
        fields={props.fields}
        validate={props.validate}
        submit={props.onSubmit}
        submitLabel={props.submitLabel}
        buttonLayout={props.buttonLayout}
      />
    </Grid>
  )
}

export default SimpleFormWithHeader