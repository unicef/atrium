import React, { useEffect, useState } from 'react'
import { StandardVerticalTemplate } from '../../templates'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//import Panel from '../overview/components/Panel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getAllProjects as getAllProjectsActions } from '../../../actions/projectActions'
import { compose } from 'recompose'
import ProjectHeader from "./components/ProjectHeader";

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: '5%'
  },
  image: {
    width: '969px',
    height: '386px'
  },
  tab: {
    textTransform: 'none'
  },
  tabs: {
    borderBottom: '1.2px solid'
  }
}))

function ProjectViewPage(props) {
  const classes = useStyles()

  useEffect(() => {
    props.getAllProjects()
  }, [props.getAllProjects])

  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (e, newVal) => {
    setTabIndex(newVal)
  }

  const params = useParams()
  const projectData = useSelector(state =>
      state.projects.allProjects.filter(el => el._id === params.id)[0]
  )

  return (
    <StandardVerticalTemplate size={8}>
      <Grid item container xs={12} className={classes.header}>
        <ProjectHeader {...projectData} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.tabs}>
          <Tabs
            value={tabIndex}
            variant="fullWidth"
            onChange={handleChange}
            centered
          >
            <Tab className={classes.tab} label="About the Project" />
            <Tab className={classes.tab} label="Comments" />
            <Tab className={classes.tab} label="Updates" />
            <Tab className={classes.tab} label="Team" />
          </Tabs>
        </div>

        {/* <Panel value={tabIndex} index={0}>
        </Panel>
        <Panel value={tabIndex} index={1}>
        </Panel>
        <Panel value={tabIndex} index={2}>
        </Panel>
        <Panel value={tabIndex} index={3}>
        </Panel>
        <Panel value={tabIndex} index={4}>
        </Panel>
        <Panel value={tabIndex} index={5}>
        </Panel> */}
      </Grid>
    </StandardVerticalTemplate>
  )
}

export default compose(
  connect(null, { getAllProjects: getAllProjectsActions })
)(ProjectViewPage)
