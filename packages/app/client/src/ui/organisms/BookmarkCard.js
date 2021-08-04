import React from 'react'
import HorizontalCardWithMenu from './HorizontalCardWithMenu'
import Box from '@material-ui/core/Box'
import { CardInfoRow } from '../molecules'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  line: {
    marginTop: '2%',
    borderBottom: '1px solid #E7E7E7'
  },
  text: {
    margin: '1% 0'
  }
}))

function BookmarkCard({ bookmark, end }) {
  const history = useHistory()
  const classes = useStyles()

  return (
    <HorizontalCardWithMenu padding="0px 30px 10px" noDots>
      <Box onClick={() => history.push(`/projects/view/${bookmark.id}/about`)}>
        <Typography variant="subtitle1" className={classes.text}>
          {bookmark.name}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {bookmark.details}
        </Typography>
      </Box>
      <Box display="flex" mb={1}>
        <CardInfoRow
          components={[
            {
              type: 'authorship',
              author: bookmark.projectOwner
            },
            {
              type: 'text',
              children: `${bookmark.likes.length} Likes`
            },
            {
              type: 'date',
              variant: 'absolute',
              date: bookmark.createdAt
            }
          ]}
        />
      </Box>
      {end ? null : <div className={classes.line} />}
    </HorizontalCardWithMenu>
  )
}

export default BookmarkCard
