import React from 'react'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Divider,
  LikeButton,
  CommentsButton,
  ViewProjectButton,
  EditProjectButton,
  DeleteProjectButton
} from '../atoms'
import { CardWithMedia } from '../molecules'
import { mergeClassNames, dateFormatter } from '../utils'
import { useTrimmedText } from '../hooks'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.only('md')]: {
      maxWidth: 285
    },
    [theme.breakpoints.only('sm')]: {
      maxWidth: 245
    }
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
  details: {
    overflowWrap: 'break-word'
  },
  projectButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5%'
  }
}))

const ProjectVerticalCard = ({
  disableActions,
  isOwner,
  maxWidth,
  ...props
}) => {
  const classes = useStyles()
  const trimmedDetails = useTrimmedText({ text: props.details, max: 134 })

  return (
    <CardWithMedia
      className={classes.root}
      maxWidth={maxWidth}
      maxHeight={509}
      mediaProps={{
        media: 'image',
        src: props.src,
        title: props.imageTitle,
        height: 208,
        alt: props.imageAlt
      }}
      actionAreaContent={
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h3"
            component="h6"
            className={classes.title}
          >
            {props.name}
          </Typography>
          <Grid item container xs={12}>
            <Typography
              variant="caption"
              component="p"
              className={classes.details}
            >
              {trimmedDetails}
            </Typography>
          </Grid>
        </CardContent>
      }
      {...props}
    >
      {isOwner ? (
        <div>657 likes 67 comments 22.02.2022</div>
      ) : (
        <CardActions className={classes.cardActions}>
          <LikeButton
            disabled={disableActions}
            id={props.id}
            mr={20}
            numberOfLikes={props.likesCount}
            onLike={props.onLike}
            liked={props.userLiked}
          />
          <CommentsButton
            disabled={disableActions}
            onClick={props.openComments}
            numberOfComments={`${props.commentsCount} comments`}
          />
        </CardActions>
      )}

      <CardContent className={classes.footer}>
        {isOwner ? (
          <div className={classes.projectButtons}>
            <ViewProjectButton id={props._id} />
            <EditProjectButton id={props._id} />
            <DeleteProjectButton id={props._id} />
          </div>
        ) : (
          <>
            <Divider mb={10} mt={10} />
            <Typography className={classes.footerText}>
              By {props.owner.name}
            </Typography>
            <Grid container item xs={12}>
              <Typography className={classes.footerText}>
                {dateFormatter({ date: props.createdAt, separator: '.' })}
              </Typography>
              {props.linkToRepository && (
                <>
                  <Typography
                    className={mergeClassNames(
                      classes.code,
                      classes.footerText
                    )}
                  >
                    ·
                  </Typography>
                  <Typography
                    component="a"
                    href={props.linkToRepository}
                    className={mergeClassNames(
                      classes.code,
                      classes.footerText
                    )}
                  >
                    View code
                  </Typography>
                </>
              )}
            </Grid>
            <Divider mb={10} mt={10} />
          </>
        )}
      </CardContent>
    </CardWithMedia>
  )
}

ProjectVerticalCard.propTypes = {
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

export default React.memo(ProjectVerticalCard)
