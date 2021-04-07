import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { TextButton, Divider, MediaLoader } from '../atoms'
import { mergeClassNames } from '../utils'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  image: props => ({
    borderRadius: 5,
    objectFit: 'fill',
    transition: 'opacity 1s',
    height: 208,
    opacity: props.imageLoaded ? 1 : 0
  }),
  button: {
    padding: 10,
    marginTop: 0
  },
  footer: {
    paddingTop: 0,
    paddingLeft: 0
  },
  footerText: {
    fontSize: 13,
    lineHeight: '180%',
    fontWeight: 'normal'
  },
  code: {
    fontWeight: 500,
    marginLeft: 5
  },
  cardActions: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  cardContent: {
    paddingLeft: 0
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    marginBottom: 20
  }
})

const CardWithImage = ({ name, details, owner, createdAt, commentsCount, likesCount, code, src, imageTitle, imageAlt }) => {
  const [imageLoaded, setLoaded] = useState(false)
  const classes = useStyles({ imageLoaded })
  
  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea>
        <MediaLoader imageLoaded={imageLoaded}>
          <CardMedia
            component="img"
            alt={imageAlt}
            image={src}
            title={imageTitle}
            className={classes.image}
            onLoad={() => setLoaded(true)}
          />
        </MediaLoader>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h3" component="h6" className={classes.title}>
            {name}
          </Typography>
          <Typography variant="caption"  component="p">
            {details}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.cardActions}>
        <TextButton
          className={classes.button}
          startIcon={<ThumbUpAltOutlined />}
          textContent={`${likesCount} likes`}
          size="mini"
        />
        <TextButton
          className={classes.button}
          startIcon={<ModeCommentOutlinedIcon />}
          textContent={`${commentsCount} comments`}
          size="mini"
        />
      </CardActions>

      <CardContent className={classes.footer}>
        <Divider mb={10} mt={10} />
        <Typography className={classes.footerText}>
          By {owner}
        </Typography>
        <Grid container item xs={12}>
          <Typography className={classes.footerText}>
            {createdAt}
          </Typography>
          <Typography className={mergeClassNames(classes.code, classes.footerText)}>·</Typography>
          <Typography className={mergeClassNames(classes.code, classes.footerText)}>{code}</Typography>
        </Grid>
        <Divider mb={10} mt={10} />
      </CardContent>
    </Card>
  )
}

export default CardWithImage
