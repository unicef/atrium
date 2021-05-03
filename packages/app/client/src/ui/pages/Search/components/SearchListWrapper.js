import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import ListHeader from './ListHeader'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from './Pagination'
import { useContainerStyle } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  projectsList: {
    justifyContent: 'flex-start',
    [theme.breakpoints.down("xs")]: {
      justifyContent: 'center',
    }
  },
  paginationWrapper: {
    marginTop: 30
  }
}))

const SearchListWrapper = ({ children, headerText, sortBy }) => {
  const classes = useStyles()
  const containerStyle = useContainerStyle({ size: 'regular', mt: 10 })

  return (
    <Container component="div" className={containerStyle}>
      <Grid item xs={12} container classes={classes.projectsList}>
        <ListHeader text={headerText} sortBy={sortBy} />
        {children}
        <Grid item container className={classes.paginationWrapper} xs={12} justify="center">
          <Pagination />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchListWrapper
