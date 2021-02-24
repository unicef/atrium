import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { Button, CommonModal } from '../../ui'

const useStyles = makeStyles(theme => ({
  content: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    maxWidth: 254,
    width: '100%',
    height: 'auto',
    margin: '0 auto 20px auto'
  }
}))

const ResponseModal = ({
  img,
  imgAlt,
  response,
  handleClose,
  isOpen,
  responseTitle
}) => {
  const classes = useStyles()
  return (
    <CommonModal open={isOpen} onClose={handleClose} style={{ maxWidth: 595 }}>
      <div className={classes.content}>
        <img src={img} className={classes.img} alt={imgAlt} />
        {responseTitle && <Typography
          component="p"
          variant="h4"
          color="secondary"
          style={{ marginBottom: 7 }}
        >
          {responseTitle}
        </Typography>}
        <Typography component="p" variant="body1" style={{ marginBottom: 30 }}>
          {response}
        </Typography>
        <Button type="button" color="primary" fullWidth onClick={handleClose}>
          Got it
        </Button>
      </div>
    </CommonModal>
  )
}

ResponseModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  img: PropTypes.func.isRequired,
  imgAlt: PropTypes.string,
  response: PropTypes.string.isRequired,
  responseTitle: PropTypes.string
}

export default ResponseModal