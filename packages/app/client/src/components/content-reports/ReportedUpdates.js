import React from 'react'
import { ReportActionsButtons } from './ReportActionsButtons'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { HorizontalCardWithMenu } from '../../ui/organisms'
import { CardInfoRow } from '../../ui'
import Box from '@material-ui/core/Box'

function ReportedUpdates({ updates }) {
  const menuItems = [
    // {
    //   label: 'Edit',
    //   handleClick: () => setEditMode(true)
    // },
    // {
    //   label: 'Delete',
    //   handleClick: () => {
    //     setDeletionModalVisibility(true)
    //   }
    // }
  ]

  const userIsTheOwner = true

  return (
    <Grid container spacing={1} xs={12}>
      {updates &&
        updates.length &&
        updates.map(update => (
          <Grid item xs={12}>
            <HorizontalCardWithMenu
              key={update.id}
              menuItems={menuItems}
              userIsTheOwner={userIsTheOwner}
            >
              <Typography>{update.title}</Typography>
              <Box display="flex" mb={1}>
                <CardInfoRow
                  components={[
                    {
                      type: 'authorship',
                      author: update.owner.name
                    },
                    {
                      type: 'date',
                      variant: 'absolute',
                      date: update.date
                    }
                  ]}
                />
              </Box>
              <Typography>{update.text}</Typography>
            </HorizontalCardWithMenu>
            <Grid>
              <span>{update.reportMessage}</span>
            </Grid>
            <ReportActionsButtons
              deleteAction={() => {}}
              dismissAction={() => {}}
              key={update.id}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default ReportedUpdates
