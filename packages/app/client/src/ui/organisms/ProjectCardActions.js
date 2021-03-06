import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { withStyles, CardActions } from '@material-ui/core'
import { ReactComponent as SearchButton } from '../../icons/search.svg'
import { Button, LikeButton, CommentsButton } from '../atoms'

const styles = theme => ({
  container: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  actionButton: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 0.8,
    marginRight: 8,
    paddingLeft: 2,
    textDecoration: 'none'
  },
  disabled: {
    color: `${theme.colors['light-gray']} !important`,
    fill: theme.colors['light-gray'],
    backgroundColor: `${theme.colors['white']} !important`
  },
  actionButtonAccent: {
    color: theme.colors['shamrock-green'],
    fill: theme.colors['shamrock-green']
  },
  learnMore: {
    marginLeft: 'auto',
    marginTop: 2,
    lineHeight: 1.5,
    '& > span':{
      fontSize: 16,
      verticalAlign: 'middle',
      marginLeft: 5
    }
  }
})

const ProjectCardActions = ({
  classes,
  id,
  onLikeClick,
  isLiked,
  numberOfLikes,
  numberOfComments,
  linkToRepo,
  isDetailsPage = false
}) => {

  const renderCommentsButton = React.useCallback(
    () => (
      <CommentsButton
        className={classes.actionButton}
        numberOfComments={numberOfComments}
      />
    ),
    [numberOfComments, classes.actionButton]
  )

  return (
    <CardActions className={classes.container} disableSpacing={true}>
      <LikeButton
        onLike={onLikeClick}
        numberOfLikes={numberOfLikes}
        liked={isLiked}
      />
      
      {!isDetailsPage ? (
        <Link to={`/project-details/${id}`}>{renderCommentsButton()}</Link>
      ) : (
        renderCommentsButton()
      )}
      <Button
        size="small"
        className={
          !!!linkToRepo
            ? `${classes.actionButton} ${classes.disabled}`
            : classes.actionButton
        }
        href={linkToRepo}
        target="_blank"
        id="view-code-btn"
        startIcon={<SearchButton />}
        variant="text"
        disabled={!!!linkToRepo}
      >
        View Code
      </Button>
      {!isDetailsPage && (
        <Link
          className={`${classes.actionButton} ${classes.learnMore}`}
          to={`/project-details/${id}`}
        >
          LEARN MORE <span>{'>'}</span>
        </Link>
      )}
    </CardActions>
  )
}

ProjectCardActions.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  linkToRepo: PropTypes.string,
  isDetailsPage: PropTypes.bool
}

export default withStyles(styles)(ProjectCardActions)
