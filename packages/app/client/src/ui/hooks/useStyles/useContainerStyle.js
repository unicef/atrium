import { makeStyles } from '@material-ui/styles'

const handleProps = (style) => (props) => {
  const margin = props.margin ? { margin: props.margin } : {}
  return { 
    ...style,
    marginTop: props.mt,
    ...margin
  }
}

const useStyles = makeStyles({
  small: handleProps({
    width: '100%',
    maxWidth: 475
  }),
  full: handleProps({
    width: '100%',
    maxWidth: '100vw',
    marginRight: 0,
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }),
  regular: handleProps({
    width: '100%',
    maxWidth: 1200
  })
})

const useContainerStyle = ({ margin, size, mt = 50 }) => {
  const style = useStyles({ mt, margin })

  return style[size]
}

export default useContainerStyle
