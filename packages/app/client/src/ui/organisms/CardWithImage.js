import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import { TextButton, Divider } from '../atoms'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  image: {
    borderRadius: 5
  }
})

const CardWithImage = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="208"
          image="https://picsum.photos/id/1040/200/300"
          title="Contemplative Reptile"
          className={classes.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
          Lorem Ipsum is simply dummy text of the printing and typesetting 
          </Typography>
          <Typography variant="body1"  component="p">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <TextButton
          //className={classes.button}
          startIcon={<ThumbUpIcon />}
          textContent="567 Likes"
          size="mini"
        />
        <TextButton
          //className={classes.button}
          startIcon={<ModeCommentIcon />}
          textContent=" 67 comments"
          size="mini"
        />
         
      </CardActions>

      <CardContent>
        <Divider />
        <Typography gutterBottom variant="body1" component="h2">
          By Paweł Bartosz
        </Typography>
        <Typography variant="body1" s>
          22.03.2020 · View code
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  )
}

export default CardWithImage
