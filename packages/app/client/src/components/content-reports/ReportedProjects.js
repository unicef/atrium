import { Grid } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { ActionDialog, CardInfoRow, HorizontalCardWithMenu } from '../../ui'
import Box from '@material-ui/core/Box'
import { useProjectsAsyncActions } from '../../ui/hooks'
import { useHistory } from 'react-router'

const ReportedProjects = ({ projects }) => {
  const { reportProject, deleteProject } = useProjectsAsyncActions()
  const userIsTheOwner = true
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const history = useHistory()

  return (
    <Grid container spacing={1} xs={12}>
      {projects &&
        projects.length > 0 &&
        projects.map(project => (
          <Grid item xs={12} key={project._id}>
            <HorizontalCardWithMenu
              key={projects._id}
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
                    reportProject({ id: project._id, reported: false })
                  }
                }
              ]}
              userIsTheOwner={userIsTheOwner}
            >
              <Typography
                onClick={() =>
                  history.push(`projects/view/${project._id}/about`)
                }
              >
                {project.name}
              </Typography>
              <Box display="flex" mb={1}>
                <CardInfoRow
                  components={[
                    {
                      type: 'authorship',
                      author: project.owner.name
                    },
                    {
                      type: 'date',
                      variant: 'absolute',
                      date: project.createdAt
                    }
                  ]}
                />
              </Box>
              <Typography>{project.details}</Typography>
            </HorizontalCardWithMenu>
            <Grid style={{margin: '1% 0'}}>
              <span>Reason for reporting: {project.reportMessage}</span>
            </Grid>
            <ActionDialog
              open={showDeletionModal}
              handleClose={() => setDeletionModalVisibility(false)}
              onConfirm={async () => {
                await deleteProject(project._id)
                setDeletionModalVisibility(false)
              }}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default ReportedProjects
