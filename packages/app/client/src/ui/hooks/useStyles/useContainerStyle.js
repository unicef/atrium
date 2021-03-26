import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  small: {
    maxWidth: 475,
    marginTop: 50
  },
  full: {
    width: '100%',
    maxWidth: '100vw',
    marginRight: 0,
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 50,
    paddingBottom: 0
  },
  regular: {
    maxWidth: 1024,
    marginTop: 50
  }
})

const useContainerStyle = ({ size }) => {
  const style = useStyles()

  return style[size]
}

export default useContainerStyle
