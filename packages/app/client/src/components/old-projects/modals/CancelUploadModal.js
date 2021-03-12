import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { ATRIUM_CONSTANTS } from '../../../unin-constants'
import { Button, CommonModal } from '../../../ui'

const styles = theme => ({
  contentBlock: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  dividerRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    flexGrow: 1,
    backgroundColor: 'black'
  },
  dividerText: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    margin: '0 10px',
    textTransform: 'uppercase'
  },
  textArea: {
    width: '100%',
    padding: '14px 15px',
    marginBottom: 40,
    fontFamily: 'Roboto',
    fontSize: 16,
    border: `1px solid ${theme.colors['warm-gray']}`,
    borderRadius: 5
  },
  reportIssue: {
    backgroundColor: '#33d76f'
  },
  cancelUpload: {
    backgroundColor: '#FD455B', 
    color: '#ffffff'
  }
})

const CancelUploadModal = ({
  classes,
  isOpen,
  onClose,
  history
}) => {
  const handleRedirectTo = () => {
    history.replace('/view-projects')
  }

  return (
    <CommonModal open={isOpen} onClose={onClose}>
      <>
        <div className={classes.contentBlock}>
          <Typography component="p" style={{ marginBottom: 32 }}>
            Are you sure you want to cancel project upload?
          </Typography>

          <Button
            type="button"
            color="inherit"
            fullWidth
            onClick={handleRedirectTo}
            className={classes.cancelUpload}
          >
            I want to cancel project upload
          </Button>
        </div>
        <div className={classes.dividerRow}>
          <Divider className={classes.divider} />
          <Typography className={classes.dividerText} component="span">
            or
          </Typography>
          <Divider className={classes.divider} />
        </div>
        <div className={classes.contentBlock}>
          <Typography component="p" style={{ marginBottom: 20 }}>
            If there are any problems that you are facing with uploading the
            project, we are happy to assist you.
          </Typography>
          <Button
            type="submit"
            fullWidth
            color="primary"
            href={`mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`}
            className={classes.reportIssue}
          >
            Report issue
          </Button>
        </div>
      </>
    </CommonModal>
  )
}

export default compose(withRouter, withStyles(styles))(CancelUploadModal)
