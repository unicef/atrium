import React from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

import { Button, CommonModal } from '../../ui'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  content: {
    padding: '63px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  badgeImage: {
    alignSelf: 'center',
    width: 228,
    height: 228,
    marginBottom: 36
  },
  button: {
    marginTop: 30,
    height: 46
  }
})

const ModalBadgeUnlock = ({
  closeModal,
  classes,
  image,
  unlockText,
  unlockButton,
  path,
  history
}) => {
  const onModalClose = e => {
    e.stopPropagation()
    e.preventDefault()
    closeModal()
  }

  const onParticipateClick = e => {
    history.push(path)
    closeModal()
  }

  return (
    <CommonModal open onClose={onModalClose}>
      <div className={classes.content}>
        <img className={classes.badgeImage} src={image} alt={'Badge logo'} />
        <Typography
          component="p"
          variant="h4"
          color="secondary"
          style={{ marginBottom: 15 }}
        >
          Unlock badge
        </Typography>
        <Typography>{unlockText}</Typography>
        <Button
          color="primary"
          fullWidth
          className={classes.button}
          onClick={onParticipateClick}
        >
          {unlockButton}
        </Button>
      </div>
    </CommonModal>
  )
}

export default compose(withRouter, withStyles(styles))(ModalBadgeUnlock)
