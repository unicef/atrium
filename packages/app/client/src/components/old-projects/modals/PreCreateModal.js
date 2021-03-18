import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'

import { Button, CommonModal } from '../../../ui'
import { ProjectBlockchainImg } from '../assets'

const styles = theme => ({
  content: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    maxWidth: 445,
    width: '100%',
    height: 'auto',
    margin: '0 auto 36px auto'
  },
  link: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 2
  }
})

const PreCreateModal = ({ classes, isOpen, onClose, ...props }) => {
  const redirectTo = () => {
    props.history.push('/create-projects')
  }

  return (
    <CommonModal open={isOpen} onClose={onClose}>
      <div className={classes.content}>
        <img
          src={ProjectBlockchainImg}
          className={classes.img}
          alt="Projects Blockchain only"
        />
        <Typography
          component="p"
          variant="h4"
          color="secondary"
          style={{ marginBottom: 7 }}
        >
          Blockchain projects only
        </Typography>
        <Typography component="p" variant="body1" style={{ marginBottom: 30 }}>
          The Atrium is a blockchain-specific collaboration platform. Please
          only upload projects that involve blockchain technology.
        </Typography>
        <Button
          type="button"
          variant="outlined"
          onClick={redirectTo}
          style={{ marginBottom: 13 }}
        >
          I have a blockchain project
        </Button>
        <Button type="button" variant="outlined" onClick={onClose}>
          I don't have a blockchain project
        </Button>
      </div>
    </CommonModal>
  )
}

export default compose(withRouter, withStyles(styles))(PreCreateModal)
