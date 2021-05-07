import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Comment } from '../../../../organisms'
import { useSelector } from 'react-redux'

const contentWithMentions = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. What do you think @Wanderson Veiga ????"
const content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five"
const date = new Date('2021-04-14T10:18:17.054Z')

const reply = {
  id: `Mehran Hydary_700009`,
  user: { name: 'Mehran Hydary', id: 'Mehran Hydary' },
  mentions: [],
  content,
  date
}

const comments = new Array(5).fill('').map((_, index) => {
  if (index % 2 === 0) {
    return {
      id: `Gustav Strömfelt_${index}`,
      user: { name: 'Gustav Strömfelt', id: 'Gustav Strömfelt' },
      mentions: [{ name: 'Wanderson Veiga', email: "wanderson.veiga@appliedblockchain.com", role: "Developer", src: "https://media-exp1.licdn.com/dms/image/C4E03AQESx4Bya2JKuA/profile-displayphoto-shrink_400_400/0/1517347609144?e=1625702400&v=beta&t=kwutOGqjHxWurNN2xQK4tKBPnOt2EnNNg_R2ypf1sPA" }],
      content: contentWithMentions,
      date,
      replies: [reply, reply]
    }
  }

  return {
    id: `Mehran Hydary_${index}`,
    user: { name: 'Mehran Hydary', id: 'Mehran Hydary' },
    mentions: [],
    content,
    date,
    replies: []
  }
})

export default function CustomizedTreeView() {
  const projectsComments = useSelector(state => state.projects.selectedProject.comments)
  return (
    <Grid container item xs={12}>
      {projectsComments.map((comment, index) => (
        <Comment userIsTheOwner={index % 2 !== 0} key={comment.id} author={comment.user.name} {...comment} >
          {Array.isArray(comment.replies) && comment.replies.length > 0 ? comment.replies.map((reply) => <Comment key={reply.id} author={reply.user.name} {...reply} />) : null}
        </Comment>
      )) }
    </Grid>
  )
}
