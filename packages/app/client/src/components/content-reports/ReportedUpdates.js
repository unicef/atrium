import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { ActionDialog, HorizontalCardWithMenu } from '../../ui/organisms'
import { CardInfoRow } from '../../ui'
import Box from '@material-ui/core/Box'
import { useProjectsAsyncActions } from '../../ui/hooks'
import { useHistory } from 'react-router'

function ReportedUpdates({ updates }) {
  const { reportUpdateBE } = useProjectsAsyncActions()
  const history = useHistory()
  const userIsTheOwner = true
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const { deleteUpdate } = useProjectsAsyncActions()

  return (
    <Grid container spacing={1} xs={12}>
      {updates &&
        updates.length > 0 &&
        updates.map(update => (
          <Grid item xs={12} key={update._id}>
            <HorizontalCardWithMenu
              key={update._id}
              menuItems={[
                {
                  label: 'Delete',
                  handleClick: () => {
                    setDeletionModalVisibility(true)
                  }
                },
                {
                  label: 'Unreport',
                  handleClick: () => {
                    reportUpdateBE({ id: update._id, reported: false })
                  }
                }
              ]}
              userIsTheOwner={userIsTheOwner}
            >
              <Typography
                onClick={() =>
                  history.push(`projects/view/${update.projectId}/updates`)
                }
              >
                {update.title}
              </Typography>
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
            <Grid style={{margin: '1% 0'}}>
              <span>Reason for reporting: {update.reportMessage}</span>
            </Grid>
            <ActionDialog
              open={showDeletionModal}
              handleClose={() => setDeletionModalVisibility(false)}
              onConfirm={async () => {
                await deleteUpdate(update._id)
                setDeletionModalVisibility(false)
              }}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default ReportedUpdates
