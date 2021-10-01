import makeStyles from '@material-ui/styles/makeStyles'

const styles = makeStyles((theme) => ({
  grayText: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '142.3%',
    color: '#BCBEBE'
  },
  blackText: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '130%',
    marginTop: '0.938rem',
    cursor: 'pointer',
    '&[data-marked="true"]': {
      color: '#15B54A',
      textDecoration: 'underline'
    },
    '&[data-marked="false"]': {
      color: 'black',
      textDecoration: 'none'
    },
    '&:hover': {
      color: '#15B54A',
      textDecoration: 'underline'
    },
  },
  wrapper: {
    marginRight: '6.25rem',
    marginTop: '0.75rem',
    marginBottom: '1.75rem',
  },
  stickContainer: {
    position: "sticky",
    top: '3.75rem'
  },
  greenText: {
    color: '#15B54A',
    textDecoration: 'underline'
  }
}))

export default styles
