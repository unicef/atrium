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
        subtitleProps={props.subtitleProps}
        titleProps={props.titleProps}
      />

      <Form
        fields={props.fields}
        validate={props.validate}
        submit={props.onSubmit}
        submitLabel={props.submitLabel}
        buttonLayout={props.buttonLayout}
        initialErrors={props.initialErrors}
      >
        {props.renderBellowForm}
      </Form>
    </Grid>
  )
}

export default SimpleFormWithHeader