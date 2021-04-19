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
  }
}))

const SearchListWrapper = ({ children, numberOfPages, headerText }) => {
  const classes = useStyles()
  const containerStyle = useContainerStyle({ size: 'regular', mt: 10 })

  return (
    <Container component="div" className={containerStyle}>
      <Grid item xs={12} container classes={classes.projectsList}>
        <ListHeader text={headerText} />
        {children}
        <Grid item container style={{ marginTop: 30 }} xs={12} justify="center">
          <Pagination count={numberOfPages} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchListWrapper
