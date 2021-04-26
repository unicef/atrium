import React from 'react'
import MediaLoader from './MediaLoader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  ({
    image: props => ({
      borderRadius: 5,
      objectFit: props.objectFit,
      height: props.height,
      width: props.width
    })
  })
)

const Image = ({ height, width, objectFit, children, ...props}) => {
  const [imageLoaded, setLoaded] = React.useState(false)
  const classes = useStyles({ imageLoaded, height, width, objectFit })

  return (
    <MediaLoader imageLoaded={imageLoaded}>
      <img
        {...props}
        //TODO: MISSING ERROR OR BROKEN LINK FALLBACK/PLACEHOLDER
        onLoad={() => setLoaded(true)}
        className={classes.image}
      />
      {children}
    </MediaLoader>
  )
}

Image.defaultProps ={
  height: '100%',
  width: '100%',
  objectFit: 'fill'
}

export default Image