import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LaunchIcon from '@material-ui/icons/Launch'
import IconButton from '@material-ui/core/IconButton'
import { Title, Divider } from '../../../atoms'

const ResourceRow = ({ title, href}) => (
  <Grid item xs={12}>
    <Grid item container xs={12} justify="space-between" alignItems="center">
      <div>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body2">via {href}</Typography>
      </div>
      <IconButton
        color="primary"
        aria-label="upload upward"
        component="a"
        href={href}
        target="_blank"
      >
        <LaunchIcon />
      </IconButton>
    </Grid>
    <Divider />
  </Grid>
)

const ResourceList = (props) => (
  props.sections.map((section) => (
    <Grid item container xs={12}>
      <Title variant="h5">{section.title}</Title>
      {section.resources.map((resource) => <ResourceRow {...resource} />)}
    </Grid>
  ))
)

ResourceList.defaultProps = {
 
}

export default ResourceList
