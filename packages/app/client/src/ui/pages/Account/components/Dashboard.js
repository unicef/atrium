import React from 'react'
import { ChevronRight } from '@material-ui/icons'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import BorderedInfo from './BorderedInfo'
import {
  Button,
  Image,
} from '../../../atoms'
import { Badge } from '../../../assets'
import { EmptyResults, StructuredCard } from '../../../molecules'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import {
  useUserCommentsAsyncActions,
  useUserProjectsAsyncActions
} from '../../../hooks'
import { useSelector } from 'react-redux'
import {
  getSearchedUserComments,
  getSearchedUserLatestProject
} from '../../../../selectors'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  buttons: {
    marginTop: '10%',
    width: '184px'
  },
  bordered: {
    width: '185px',
    height: '150px',
    border: '2.2px solid #15B54A',
    borderRadius: '10px'
  },
  topText: {
    height: '56px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  count: {
    height: '87px',
    padding: '8%',
    fontSize: '45px',
    color: '#15B54A'
  },
  header: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  seeAllButton: {
    color: '#15B54A',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  line: {
    borderBottom: '1px solid #E7E7E7'
  },
  greenLine: {
    borderBottom: '2.2px solid #15B54A'
  },
  boxes: {
    margin: '5%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  greeting: {
    marginBottom: '2%',
    fontSize: '34px'
  },
  bottomBoxes: {
    marginTop: '2%'
  },
  centered: {
    textAlign: 'center'
  },
  project: {
    height: '150px'
  },
  title: {
    paddingTop: '4%'
  },
  margined: {
    margin: '5%'
  }
}))

function Dashboard(props) {
  const { handleChange } = props
  const classes = useStyles()
  const { fetchSearchedUserComments } = useUserCommentsAsyncActions()
  const { fetchSearchedUserLatestProject } = useUserProjectsAsyncActions()
  const comments = useSelector(getSearchedUserComments)
  const latestProject = useSelector(getSearchedUserLatestProject)

  const history = useHistory()

  React.useEffect(() => {
    const query = combineUserItemsQueryStrings({
      limit: 6,
      offset: 0,
      sort: 'asc'
    })
    const requestData = async () => {
      await fetchSearchedUserComments(query)
      await fetchSearchedUserLatestProject()
    }
    requestData()
  }, [])

  return (
    <>
      <Typography className={classes.greeting} variant="h3">
        Hello, {props.name}
      </Typography>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo size="normal">
            <Typography className={classes.title} variant="subtitle1">
              MY STATS
            </Typography>
            <div className={classes.boxes}>
              <div className={classes.centered}>
                <div className={classes.bordered}>
                  <div className={classes.topText}>
                    <Typography>Points</Typography>
                  </div>
                  <div className={classes.greenLine} />
                  <Typography className={classes.count}>
                    {props.balance ? props.balance : 0}
                  </Typography>
                </div>
                <Button
                  onClick={() => history.push(`/profile/${props.id}/about`)}
                  className={classes.buttons}
                  color="primary"
                >
                  View activity
                </Button>
              </div>
              <div className={classes.centered}>
                <div>
                  <div className={classes.bordered}>
                    <div className={classes.topText}>
                      <Image
                        sameSize
                        borderRadius={0}
                        width="18px"
                        height="22px"
                        src={Badge}
                      />
                      <Typography className={classes.margined}>Badges</Typography>
                    </div>
                    <div className={classes.greenLine} />
                    <Typography className={classes.count}>
                      {props.badges}/7
                    </Typography>
                  </div>
                </div>
                <Button
                  onClick={e => handleChange(e, 5)}
                  className={classes.buttons}
                  color="primary"
                >
                  View Badges
                </Button>
              </div>
            </div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo size="normal">
            <div className={classes.header}>
              <Typography variant="subtitle1">MY LATEST PROJECT</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 3)}
                endIcon={<ChevronRight />}
              >
                see all
              </Button>
            </div>
            <div>
              {latestProject ? (
                <>
                  <div className={classes.project}>
                    <StructuredCard
                      date={latestProject.createdAt}
                      title={latestProject.name}
                      content={latestProject.details}
                    />
                  </div>
                </>
              ) : (
                <EmptyResults
                  mainMessage="You don’t have any projects yet"
                  buttonLabel="Add project"
                  handleClick={() => history.push('/create-projects')}
                  buttonProps={{ className: classes.margined }}
                />
              )}
            </div>
          </BorderedInfo>
        </Grid>
      </Grid>
      <Grid className={classes.bottomBoxes} item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo size="large">
            <div className={classes.header}>
              <Typography variant="subtitle1">MY COMMENTS</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 4)}
                endIcon={<ChevronRight />}
              >
                see all
              </Button>
            </div>
            <div>
              {!Array.isArray(comments) || comments.length === 0 ? (
                <EmptyResults
                  mainMessage="You don’t have any comments yet"
                  buttonLabel="Add comment"
                  handleClick={() => history.push('/projects')}
                  buttonProps={{ className: classes.margined }}
                />
              ) : (
                comments.map((comment, i) => (
                  <>
                    <StructuredCard
                      key={comment.id}
                      date={comment.date}
                      title={comment.content}
                    />
                    {i === comments.length - 1 ? null : (
                      <div className={classes.line} />
                    )}
                  </>
                ))
              )}
            </div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo size="large">
            <div className={classes.header}>
              <Typography variant="subtitle1">MY POSTS</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 8)}
                endIcon={<ChevronRight />}
              >
                see all
              </Button>
            </div>
            <div></div>
          </BorderedInfo>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
