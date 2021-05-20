import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const TabContentTitle = withStyles(() => ({
  root: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '27px',
    marginTop: 40,
    marginBottom: 30
  }
}))(Typography)

export default TabContentTitle
