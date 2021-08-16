import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme) => ({
  inputLabel: {
    color: 'black',
    marginBottom: 6,
    fontWeight: 500
  },
  editAttachmentMessage: {
    color: theme.colors['dark-gray']
  },
  fileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  fileInputLabel: {
    cursor: 'pointer'
  },
  dropBoxBorder: {
    padding: '3%',
    width: '100%',
    backgroundImage:
      'repeating-linear-gradient(2deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px),' +
      ' repeating-linear-gradient(92deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px), ' +
      'repeating-linear-gradient(182deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px), ' +
      'repeating-linear-gradient(272deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px)',
    backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
    backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center'
  },
  firstDropBoxText: {
    marginTop: '2%',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 350,
    fontSize: 18
  },
  secondDropBoxText: {
    marginTop: '2%',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: 13
  },
  errorMessage: {
    marginLeft: 0,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.error.main
  },
  myPostButton: {
    width: '46px',
    height: '46px',
    padding: 0,
    minWidth: 0,
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3
  }
}))

export default styles
