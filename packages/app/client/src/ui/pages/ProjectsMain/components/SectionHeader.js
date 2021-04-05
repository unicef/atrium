import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { Title, TextButton } from '../../../atoms'

const useStyles = makeStyles({
  textButton: {
    margin: 0,
    padding: 0,
    '& span': {
      fontWeight: 500,
      fontSize: '15px',
      lineHeight: '180%',
    }
  },
  container: {

  }
})

const SectionHeader = ({ name, sortable }) => {
  const [sortAsc, setSort] = useState(true)
  const sortType = sortAsc ? 'ASC' : 'DESC'
  const classes = useStyles()

  return (
    <Grid xs={12} item container justify="space-between" alignItems="center"> 
      <Title mb={0}>{name}</Title>
      {sortable && 
        <TextButton
          onClick={() => setSort(prevVal => !prevVal)}
          endIcon={sortAsc ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          textContent={`Sort by date (${sortType})`}
          className={classes.textButton}
        />
      }
    </Grid>
  )
}

export default SectionHeader
