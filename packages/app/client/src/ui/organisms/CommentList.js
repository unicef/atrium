import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles, Grid, Divider } from '@material-ui/core'
import { Button, Comment } from '../'
import { ReactComponent as PlusIcon } from '../../icons/plus.svg'
import { ReactComponent as MinusIcon } from '../../icons/minus.svg'

const styles = theme => ({
  container: {
    paddingTop: 22
  },
  containerBordered: {
    borderTop: 'solid 1px #e2e2e2'
  },
  button: {
    padding: 0,
    marginRight: 10,
    color: theme.colors['shamrock-green']
  },
  divider: {
    flex: 1,
    backgroundColor: '#e2e2e2'
  }
})

const numberOfCollapsedComments = 2

const CommentList = ({ classes, comments, noBorders = false }) => {
  const [expanded, setExpanded] = React.useState(false)

  let commentsToRender = comments
  if (!expanded && comments.length > numberOfCollapsedComments) {
    commentsToRender = comments.slice(0, numberOfCollapsedComments)
  }

  const containerClassName = classnames(classes.container, {
    [classes.containerBordered]: !noBorders
  })

  return (
    <>
      <Grid container direction="column" className={containerClassName}>
        {commentsToRender.map((comment, i) => (
          <Grid item xs={12} key={i}>
            <Comment key={`comment-${i}`} {...comment} />
          </Grid>
        ))}
        <Grid container alignItems="center" style={{ marginBottom: 20 }}>
          {comments.length > numberOfCollapsedComments ? (
            <Grid item xs={12}>
              <Button
                className={classes.button}
                onClick={() => setExpanded(!expanded)}
                variant="text"
                size="small"
                startIcon={expanded ? <MinusIcon /> : <PlusIcon />}
              >
                {expanded
                  ? 'Hide Comments'
                  : `${comments.length -
                      numberOfCollapsedComments} more comments`}
              </Button>
            </Grid>
          ) : null}
          {noBorders ? null : <Divider className={classes.divider} />}
        </Grid>
      </Grid>
    </>
  )
}

CommentList.propTypes = {
  classes: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  noBorders: PropTypes.bool
}

export default withStyles(styles)(CommentList)
