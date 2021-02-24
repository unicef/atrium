import React from 'react'
import PropTypes from 'prop-types'
import { CommonModal, ModalContainer } from '../'
import { Typography, withStyles, Grid } from '@material-ui/core'

const styles = theme => ({
  title: {
    color: theme.colors['dark-forest-green'],
    marginBottom: 8
  },
  childrenContainer: {
    marginTop: 30
  }
})

const TitledModal = ({
  title,
  description,
  children,
  open,
  onClose,
  classes,
  ...props
}) => {
  return (
    <CommonModal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        {description ? (
          <Typography variant="body1">{description}</Typography>
        ) : null}
        <Grid item className={classes.childrenContainer}>
          {children}
        </Grid>
      </ModalContainer>
    </CommonModal>
  )
}

TitledModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TitledModal)
