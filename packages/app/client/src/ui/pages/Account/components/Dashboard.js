import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import BorderedInfo from './BorderedInfo'
import Typography from '@material-ui/core/Typography'
import { Button } from '../../../atoms'

function Dashboard(props) {
  const compareByDate = (a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  }
  const user = useSelector(state => state.auth.user)
  // const latestProject = user.projects.sort(compareByDate)[0]
  return (
    <>
      <Typography style={{ marginBottom: '2%', fontSize: '34px' }} variant="h3">
        Hello, {user.name}
      </Typography>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY STATS</Typography>
            <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{width: '185px', height: '150px', border: '2.2px solid #15B54A', borderRadius: '10px'}}>
                <div style={{height: '56px'}}>

                </div>
                <div style={{borderBottom: '2.2px solid #15B54A'}}/>
                <div>

                </div>
              </div>
              <div style={{width: '185px', height: '150px', border: '2.2px solid #15B54A', borderRadius: '10px'}}>
                <div style={{height: '56px'}}>

                </div>
                <div style={{borderBottom: '2.2px solid #15B54A'}}/>
                <div>

                </div>
              </div>
            </div>
            <div>
              <Button color="primary">Redeem likes</Button>
              <Button color="primary">View Badges</Button>
            </div>
            </div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY LATEST PROJECT</Typography>
            <div>
              <div style={{width: '450px', height: '150px'}}>
              {/*<div>{latestProject.date} days ago</div>*/}
              {/*<div>{latestProject.name}</div>*/}
              {/*<div>{latestProject.details}</div>*/}
              </div>
              <div>
                <Button color="primary" variant="outlined">Edit</Button>
                <Button color="primary" variant="outlined">View Project</Button>
              </div>
            </div>
            <div>content</div>
          </BorderedInfo>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '2%' }} item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY COMMENTS</Typography>
            {/*<div>*/}
               {/*{user.comments.map(comment => (*/}
               {/* <div>*/}
               {/*   <div style={{ display: 'flex' }}>*/}
               {/*     <div>Post name {comment.post.name}</div>*/}
               {/*     <div>{comment.date} days ago</div>*/}
               {/*   </div>*/}
               {/*   <div>{comment.content}</div>*/}
               {/* </div>*/}
               {/*))}*/}
            {/*</div>*/}
            <div>content</div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY POSTS</Typography>
             {/*{user.posts.map(post => (*/}
             {/* <div>*/}
             {/*     <div>{post.date} days ago</div>*/}
             {/*   <div>{post.content}</div>*/}
             {/* </div>*/}
             {/*))}*/}
            <div>content</div>
          </BorderedInfo>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
