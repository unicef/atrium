import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import { UpdatesList } from '../components'
import { EmptyResults, TreeMenu } from '../../../molecules'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined'
import { useSelector } from 'react-redux'
import { getHandledUpdates, getCurrentProjectId } from '../../../../selectors'

const handleUpdatesToMenu = (updates) => {
  if (updates === undefined) {
    return null
  }

  return Object.keys(updates).map((year) => {
    const monthsKeys = Object.keys(updates[year])
    return {
      label: year,
      id: year,
      main: true,
      subItems: monthsKeys.map((month) => (
        {
          label: month,
          id: `${month}_${year}`,
        }
      ))
    }
  })
}

const ProjectUpdates = () => {
  const handledUpdates = useSelector(getHandledUpdates)
  const projectId = useSelector(getCurrentProjectId)
  const menuStructure = React.useMemo(() => handleUpdatesToMenu(handledUpdates), [handledUpdates, projectId])
  
  const firstUpdate = menuStructure && menuStructure[0]
  const firstSubitem = firstUpdate && firstUpdate.subItems[0]
  const firstUpdateId = firstUpdate && firstUpdate.id
  const firstSubitemId = firstSubitem && firstSubitem.id

  const [expanded, setExpanded] = React.useState([firstUpdateId])
  const [selected, setSelected] = React.useState([firstSubitemId])
  
  const handleToggle = (_, nodeIds) => {
    setExpanded(nodeIds)
  }
  
  const handleSelect = (_, nodeIds) => {
    const yearClicked = Boolean(menuStructure.find(item => item.id === nodeIds))

    if (!yearClicked) {
      setSelected([nodeIds])
    }
  }

  const areThereUpdates = Object.keys(handledUpdates).length > 0

  if (!areThereUpdates) {
    return (
      <EmptyResults
        height="100%"
        mainMessage="There is no updates found"
      />
    )
  }

  return (
    <Box pt={4}>
      <Grid  container item xs={12}>
        <Hidden xsDown>
          <Grid item xs={2}>
            <Box position="sticky" width="100%" bgcolor="white" top={120}>
              <TreeMenu
                menuItems={menuStructure}
                defaultCollapseIcon={<ExpandMoreOutlinedIcon />}
                defaultExpandIcon={<ExpandLessOutlinedIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                colors={
                  {
                    default: {
                      subitem: 'black-three',
                      main: 'shamrock-green'
                    },
                    expanded: {
                      main: 'shamrock-green'
                    },
                    selected: {
                      subitem: 'black-three',
                      main: 'shamrock-green'
                    },
                    hover: {
                      subitem: 'black-three',
                      main: 'shamrock-green'
                    }
                  }
                }
              />
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={10}>
          <UpdatesList projectId={projectId} handledUpdates={handledUpdates} selectedMonthId={selected[0]} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectUpdates
