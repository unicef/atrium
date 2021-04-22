import React from 'react'
import MediaLoader from './MediaLoader'
import { makeStyles } from '@material-ui/core/styles'
import { VideoPlaySVG } from '../assets'

const useStyles = makeStyles(() => ({
  overlay: {
    '& > svg ': {
      transition: 'all 0.3s ease',

      width: 50,
      height: 50
    },
    '&:hover > svg': {
      width: 65,
      height: 65
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(32,38,37,0.5)',
    borderRadius: 5
  }
}))

const Video = (props) => {
  const [videoDataLoaded, setLoaded] = React.useState(false)
  const classes = useStyles()
  const showOverlay = !props.controls && videoDataLoaded

  return (
    <MediaLoader imageLoaded={videoDataLoaded}>
      <video
        height={props.height}
        width={props.width}
        src={props.src}
        type={props.type}
        controls={props.controls}
        onLoadedData={() => setLoaded(true)}
        autoPlay={props.autoPlay}
      />
     {showOverlay && 
        <div className={classes.overlay}>
          <VideoPlaySVG />
        </div>
      }
    </MediaLoader>
  )
}

export default Video
