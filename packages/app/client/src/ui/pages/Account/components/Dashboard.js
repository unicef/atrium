import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import BorderedInfo from './BorderedInfo'
import Typography from '@material-ui/core/Typography'
import { Button } from '../../../atoms'
import { Badge, Like } from '../../../assets'
import { makeStyles } from '@material-ui/core/styles'

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
    display: 'flex',
    justifyContent: 'space-between'
  },
  seeAllButton: {
    width: '85px',
    height: '16px',
    color: '#15B54A',
    backgroundColor: 'white'
  }
}))

function Dashboard(props) {
  const { handleChange } = props
  const classes = useStyles()
  const compareByDate = (a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  }
  // const latestProject = props.projects.sort(compareByDate)[0]
  return (
    <>
      <Typography style={{ marginBottom: '2%', fontSize: '34px' }} variant="h3">
        Hello, {props.name}
      </Typography>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY STATS</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center' }}>
                <div className={classes.bordered}>
                  <div className={classes.topText}>
                    <img style={{ marginRight: '5%' }} src={Like} />
                    <div>Likes</div>
                  </div>
                  <div style={{ borderBottom: '2.2px solid #15B54A' }} />
                  {/* <div className={classes.count}> {props.likes.length}</div>*/}
                  <div className={classes.count}>23</div>
                </div>
                <Button className={classes.buttons} color="primary">
                  Redeem likes
                </Button>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div>
                  <div className={classes.bordered}>
                    <div className={classes.topText}>
                      <img style={{ marginRight: '5%' }} src={Badge} />
                      <div>Badges</div>
                    </div>
                    <div style={{ borderBottom: '2.2px solid #15B54A' }} />
                    <div className={classes.count}>
                      {props.badges &&
                        Object.keys(props.badges).filter(
                          key => props.badges[key]
                        ).length}
                      /{Object.keys(props.badges).length}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={e => handleChange(e, 6)}
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
          <BorderedInfo>
            <div className={classes.header}>
              <Typography variant="subtitle1">MY LATEST PROJECT</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 4)}
              >
                see all >
              </Button>
            </div>
            <div>
              <div style={{ width: '450px', height: '150px' }}>
                {/* <div>{latestProject.date} days ago</div>*/}
                {/* <div>{latestProject.name}</div>*/}
                {/* <div>{latestProject.details}</div>*/}
              </div>
              <div>
                <Button
                  // onClick={() =>
                  //   window.location.reload(
                  //     `/projects/overview/${latestProject._id}`
                  //   )
                  // }
                  color="primary"
                  variant="outlined"
                >
                  Edit
                </Button>
                <Button
                  // onClick={() =>
                  //   window.location.reload(
                  //     `/projects/${latestProject._id}`
                  //   )
                  // }
                  color="primary"
                  variant="outlined"
                >
                  View Project
                </Button>
              </div>
            </div>
            <div>content</div>
          </BorderedInfo>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '2%' }} item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <div className={classes.header}>
              <Typography variant="subtitle1">MY COMMENTS</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 5)}
              >
                see all >
              </Button>
            </div>
            {/* <div>*/}
            {/* {props.comments.map(comment => (*/}
            {/* <div>*/}
            {/*   <div style={{ display: 'flex' }}>*/}
            {/*     <div>Post name {comment.post.name}</div>*/}
            {/*     <div>{comment.date} days ago</div>*/}
            {/*   </div>*/}
            {/*   <div>{comment.content}</div>*/}
            {/* </div>*/}
            {/* ))}*/}
            {/* </div>*/}
            <div>content</div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <div className={classes.header}>
              <Typography variant="subtitle1">MY POSTS</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 3)}
              >
                see all >
              </Button>
            </div>
            {/* {props.posts.map(post => (*/}
            {/* <div>*/}
            {/*     <div>{post.date} days ago</div>*/}
            {/*   <div>{post.content}</div>*/}
            {/* </div>*/}
            {/* ))}*/}
            <div>content</div>
          </BorderedInfo>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
