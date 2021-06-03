import { Grid } from '@material-ui/core'
import React from 'react'
import { ActionProjectButton } from '../../ui'

export const ReportActionsButtons = ({dismissAction, deleteAction}) => {
  return (
    <Grid container justify="space-around" alignItems="center">
      <ActionProjectButton type="edit" text="Dismiss" onClick={dismissAction} />
      <ActionProjectButton type="delete" color="error" onClick={deleteAction} />
    </Grid>
  )
}
