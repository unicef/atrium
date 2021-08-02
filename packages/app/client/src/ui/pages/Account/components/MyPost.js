import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, Link } from '@material-ui/core'
import { MainContainer } from '../../../templates'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '7%'
  }
}))

function MyPost({ name }) {
  const classes = useStyles()
  return (
    <MainContainer size="small" mt="-50px" margin="0">
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h4">
          My posts
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link href={`/forum/user/${name.split(' ')[0].toLowerCase()}/posts`}>
          This link will send you to your posts on NodeBB forum
        </Link>
      </Grid>
    </MainContainer>
  )
}
export default MyPost
