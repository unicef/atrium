import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, MediaLoader, LikeButton, CommentsButton } from '../atoms'
import { mergeClassNames, dateFormatter, composeMargins } from '../utils'

const useStyles = makeStyles(theme =>
  ({
    root: props => ({
      width: '100%',
      height: '100%',
      maxWidth: 345,
      maxHeight: 509,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.only("md")]: {
        maxWidth: 285,
      },
      [theme.breakpoints.only("sm")]: {
        maxWidth: 245,
      },
      ...composeMargins(props)
    }),
    image: props => ({
      borderRadius: 5,
      objectFit: 'fill',
      transition: 'opacity 1s',
      height: 208,
      width: '100%',
      opacity: props.imageLoaded ? 1 : 0
    }),
    footer: {
      paddingTop: 0,
      paddingLeft: 0
    },
    footerText: {
      fontSize: 13,
      lineHeight: '180%',
      fontWeight: 'normal',
      color: theme.palette.text.primary
    },
    code: {
      fontWeight: 500,
      marginLeft: 5,
      textDecoration: 'none'
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
    },
    detailsWrapper: {
      display: 'flex',
      flexGrow: 1,
    },
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

const ProjectMainCard = ({ disableActions, ...props }) => {
  const [imageLoaded, setLoaded] = useState(false)
  const classes = useStyles({ imageLoaded, ...props })
  
  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea className={classes.upperArea}>
        <MediaLoader imageLoaded={imageLoaded}>
          <CardMedia
            component="img"
            alt={props.imageAlt}
            image={props.src}
            title={props.imageTitle}
            className={classes.image}
            onLoad={() => setLoaded(true)}
          />
        </MediaLoader>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h3" component="h6" className={classes.title}>
            {props.name}
          </Typography>
          <Grid item xs={12}>
            <Typography variant="caption"  component="p">
              {props.details}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.cardActions}>
        <LikeButton disabled={disableActions} id={props.id} mr={20} numberOfLikes={props.likesCount} onLike={props.onLike} liked={props.userLiked}/>
        <CommentsButton disabled={disableActions} onClick={props.openComments} numberOfComments={`${props.commentsCount} comments`} />
      </CardActions>

      <CardContent className={classes.footer}>
        <Divider mb={10} mt={10} />
        <Typography className={classes.footerText}>
          By {props.owner.name}
        </Typography>
        <Grid container item xs={12}>
          <Typography className={classes.footerText}>
            {dateFormatter({ date: props.createdAt, separator: '.'})}
          </Typography>
          {props.linkToRepository && 
            <>
              <Typography className={mergeClassNames(classes.code, classes.footerText)}>·</Typography>
              <Typography component="a" href={props.linkToRepository} className={mergeClassNames(classes.code,classes.footerText)}>View code</Typography>
            </>
          }
        </Grid>
        <Divider mb={10} mt={10} />
      </CardContent>
    </Card>
  )
}

ProjectMainCard.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  owner: PropTypes.shape({ name: PropTypes.string }),
  createdAt: PropTypes.string,
  commentsCount: PropTypes.number,
  likesCount: PropTypes.number,
  linkToRepository: PropTypes.string,
  src: PropTypes.string,
  imageTitle: PropTypes.string,
  imageAlt: PropTypes.string,
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLike: PropTypes.func,
  openComments: PropTypes.func,
  isLiked: PropTypes.bool
}

export default React.memo(ProjectMainCard)
