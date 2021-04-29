import React from 'react'
import MediaLoader from './MediaLoader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  ({
    image: props => ({
      borderRadius: props.borderRadius,
      objectFit: props.objectFit,
      height: props.height,
      width: props.width
    })
  })
)

const Image = ({ height, width, sameSize, objectFit, children, borderRadius = 5, ...props}) => {
  const [imageLoaded, setLoaded] = React.useState(false)
  const classes = useStyles({ imageLoaded, height, width, objectFit, borderRadius })

  return (
    <MediaLoader width={sameSize ? width : null} height={sameSize ? height : null} imageLoaded={imageLoaded}>
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
