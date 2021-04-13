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

const CardWithImage = ({ name, details, owner, createdAt, commentsCount, likesCount, linkToRepository, src, imageTitle, imageAlt, mt, mb, ml, mr }) => {
  const [imageLoaded, setLoaded] = useState(false)
  const classes = useStyles({ imageLoaded, mt, mb, ml, mr })

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea className={classes.upperArea}>
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
          <Grid item xs={12}>
            <Typography variant="caption"  component="p">
              {details}
            </Typography>
          </Grid>
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
          By {owner.name}
        </Typography>
        <Grid container item xs={12}>
          <Typography className={classes.footerText}>
            {dateFormatter({ date: createdAt, separator: '.'})}
          </Typography>
          {linkToRepository && 
            <>
              <Typography className={mergeClassNames(classes.code, classes.footerText)}>·</Typography>
              <Typography component="a" href={linkToRepository} className={mergeClassNames(classes.code,classes.footerText)}>View code</Typography>
            </>
          }
        </Grid>
        <Divider mb={10} mt={10} />
      </CardContent>
    </Card>
  )
}

export default React.memo(CardWithImage)
