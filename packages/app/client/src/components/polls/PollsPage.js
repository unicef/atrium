import React from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import { withRouter } from 'react-router'
import { Button } from '../../ui'
import ActivePolls from './ActivePolls'
import ClosedPolls from './ClosedPolls'
import { guideWrapper } from '../guide-wrapper'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#e2e2e2'
    }
  },
  root: {
    maxWidth: 929
  },
  newPollButtonWrapper: {
    position: 'absolute',
    top: 87,
    right: 44
  }
})

const PollPage = ({ classes, ...props }) => {
  const handleRedirectTo = () => {
    props.history.push('/create-polls')
  }

  return (
    <Container component="main" className={classes.root}>
      <div className={classes.newPollButtonWrapper}>
        <Button
          type="submit"
          color="primary"
          size="small"
          onClick={handleRedirectTo}
          id="create-poll-btn"
        >
          Create a poll
        </Button>
      </div>
      <ActivePolls />
      <ClosedPolls />
    </Container>
  )
}
export default compose(guideWrapper, withStyles(styles), withRouter)(PollPage)
