import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { ProjectOwner } from '../assets'
import { CarretGreenIcon, CommonModal } from '../../../ui'

const styles = theme => ({
  content: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    maxWidth: 228,
    width: '100%',
    height: 'auto',
    margin: '23px auto 37px auto'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 0.8,
    lineHeight: 0,
    textTransform: 'uppercase'
  }
})

const SuccessfulUploadedModal = ({ classes, isOpen, onClose }) => (
  <CommonModal open={isOpen} onClose={onClose}>
    <div className={classes.content}>
      <img
        src={ProjectOwner}
        className={classes.img}
        alt="Rounded tree badge"
      />
      <Typography
        component="p"
        variant="h4"
        color="secondary"
        style={{ marginBottom: 7 }}
      >
        Project successfully uploaded
      </Typography>
      <Typography component="p" variant="body1" style={{ marginBottom: 24 }}>
        Congratulations!
      </Typography>
      <Link
        to="#"
        component={RouterLink}
        onClick={() => onClose()}
        color="secondary"
        underline="none"
        variant="subtitle1"
        className={classes.link}
      >
        Click here to view your projects!
        <CarretGreenIcon />
      </Link>
    </div>
  </CommonModal>
)

export default withStyles(styles)(SuccessfulUploadedModal)
