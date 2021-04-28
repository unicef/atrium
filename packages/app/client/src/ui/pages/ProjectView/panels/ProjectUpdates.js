import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import { UpdatesList } from '../components'
import { TreeMenu } from '../../../molecules'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
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

  if (handledUpdates === undefined) {
    return null
  }

  return (
    <Grid  container item xs={12}>
      <Hidden xsDown>
        <Grid item xs={2}>
          <Box position="sticky" width="100%" bgcolor="white" top={120}>
            <TreeMenu
              menuItems={menuStructure}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
              colors={
                {
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
        <UpdatesList  handledUpdates={handledUpdates} selectedMonthId={selected[0]} />
      </Grid>
    </Grid>
  )
}

export default ProjectUpdates
