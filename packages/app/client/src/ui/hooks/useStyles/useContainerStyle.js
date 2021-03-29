import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  small: {
    maxWidth: 475,
    marginTop: 50
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
