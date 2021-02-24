import React from 'react'
import PropTypes from 'prop-types'
import { Container, withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    width: '639px',
    padding: '87px 0px'
  }
})

const FilterableListTemplate = ({
  filterComponent,
  listComponent,
  fabButton,
  classes,
  ...props
}) => {
  return (
    <>
      <Container component="main" className={classes.root}>
        {filterComponent}
        {listComponent}
      </Container>
      {fabButton}
    </>
  )
}

FilterableListTemplate.propTypes = {
  filterComponent: PropTypes.node.isRequired,
  listComponent: PropTypes.node.isRequired,
  fabButton: PropTypes.node.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(FilterableListTemplate)
