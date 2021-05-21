import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const InfoCellTitle = withStyles(() => ({
  root: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '13px',
    lineHeight: '16px',
    textTransform: 'uppercase',
    marginBottom: 16,
    marginTop: 14
  }
}))(Typography)

export default InfoCellTitle
