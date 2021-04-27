import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import { UpdatesList } from '../components'
import { TreeMenu } from '../../../molecules'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useSelector } from 'react-redux'
import { getHandledUpdates } from '../../../../selectors'

const handleUpdatesToMenu = (updates) => {
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

const ProjectUpdates = ({ projectId }) => {
  const handledUpdates = useSelector(getHandledUpdates)
  const menuStructure = React.useMemo(() => handleUpdatesToMenu(handledUpdates), [handledUpdates.length, projectId])
  
  const firstUpdate = menuStructure[0]
  const firstSubitem = firstUpdate.subItems[0]
  const [expanded, setExpanded] = React.useState([firstUpdate.id])
  const [selected, setSelected] = React.useState([firstSubitem.id])
  
  const handleToggle = (_, nodeIds) => {
    setExpanded(nodeIds)
  }
  
  const handleSelect = (_, nodeIds) => {
    const wasYearClicked = Boolean(menuStructure.find(item => item.id === nodeIds))

    if (!wasYearClicked) {
      setSelected([nodeIds])
    }
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

ProjectUpdates.defaultProps = {
  updates: []
}

export default ProjectUpdates
