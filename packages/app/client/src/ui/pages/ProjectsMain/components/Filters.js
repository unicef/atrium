import React from 'react'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import FiltersSection from './FiltersSection'
import { makeStyles } from '@material-ui/core/styles'
import { TextButton } from '../../../atoms'
import { useProjectsMainActions } from '../../../hooks'
import { PROJECTS_SEARCH_FILTERS } from '../../../../unin-constants'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'transparent',
    padding: 0,
    transition: 'all 0.2s ease',
    width: 0,
    opacity: 0,
    overflowX: 'hidden',
    overflowY: 'scroll',
    marginBottom: 50,
    [theme.breakpoints.down("md")]: {
      marginBottom: 10
    }
  },
  visible: {
    width: 340,
    padding: 20,
    opacity: 1,
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
    }
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
  },
  header: {
    display: 'flex',
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor: theme.colors.white,
    [theme.breakpoints.down("sm")]: {
      position: 'sticky',
      paddingTop: 5,
      paddingBottom: 5,
      zIndex: 99,
      top: 0
    }
  }
}))

const Filters = () => {
  const classes = useStyles()
  const { clearFilters } = useProjectsMainActions()

  return (
    <div >
      <div className={classes.header}>
        <Typography className={classes.title}>Filters</Typography>

        <TextButton
          endIcon={<CloseIcon />}
          textContent="Clear Filters"
          size="outlined"
          onClick={clearFilters}
          // TODO: IMPORVE BUTTONS
          style={{ margin: 0, padding: 5 }}
        />
      </div>

      {PROJECTS_SEARCH_FILTERS.map((section) => (
        <FiltersSection key={section.title} {...section} />
      ))}
    </div>
  )
}

export default Filters
