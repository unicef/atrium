import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { TextButton } from '../atoms'

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
  title: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '17px',
    lineHeight: '21px',
  }
})

const SearchDateSortHeader = ({ name, sortAsc, sortDesc, sortDirection }) => {
  const classes = useStyles()
  const isAscSorting = sortDirection === 'ASC'

  return (
    <Grid xs={12} style={{ padding: 30 }} item container justify="space-between" alignItems="center"> 
      <Typography className={classes.title} mb={0}>{name}</Typography>
      <TextButton
        onClick={isAscSorting ? sortDesc : sortAsc}
        endIcon={isAscSorting ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        textContent={`Sort by date (${sortDirection.toUpperCase()})`}
        className={classes.textButton}
      />
    </Grid>
  )
}

export default SearchDateSortHeader
