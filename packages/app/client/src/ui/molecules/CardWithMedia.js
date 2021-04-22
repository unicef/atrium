import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'
import { Image, Video } from '../atoms'
import { composeMargins, mergeClassNames } from '../utils'

const useStyles = makeStyles(() =>
  ({
    root: props => ({
      height: '100%',
      width: '100%',
      maxWidth: props.maxWidth,//345,
      maxHeight: props.maxHeight,//509,
      display: 'flex',
      flexDirection: 'column',
      ...composeMargins(props)
    }),
    mediaContainer: props => ({
      height: props.mediaProps.height,
      width: props.mediaProps.width || '100%'
    }),
    upperArea: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      position: 'relative'
    }
  })
)

const handleMediaType = ({ id, media, src, alt, title, height, width = '100%', extension }) => {
  switch(media) {
    case 'image':
      return (
        <Image
          alt={alt}
          src={src}
          title={title}
          height={height}
          width={width}
        />
      )
    case 'video':
      return (
        <Video
          id={id}
          height={height}
          width={width}
          src={src}
          type={`video/${extension}`}
        />
      )
    default:
      return null
  }
}

const CardWithMedia = ({ children, actionAreaContent, mediaAreaContent, mediaProps, className, ...props }) => {
  const classes = useStyles({ ...props, mediaProps })
  
  return (
    <Card className={mergeClassNames(classes.root, className)} elevation={0}>
      <CardActionArea onClick={props.onClick} className={classes.upperArea}>
        <CardMedia className={classes.mediaContainer}>
          {mediaAreaContent || handleMediaType(mediaProps)}
        </CardMedia>
        {actionAreaContent}
      </CardActionArea>

      {children}
    </Card>
  )
}

export default CardWithMedia
