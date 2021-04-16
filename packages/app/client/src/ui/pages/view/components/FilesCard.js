import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined'
import { TextButton } from '../../../atoms';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 140,
  },
});

export default function MediaCard( mediaType, src ) {
  const classes = useStyles();

  React.useEffect(() => {
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  }, [])

  return (
    <Card elevation={0} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
        >
          <video id="video" src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" controls></video><br/>
          <canvas id="canvas"></canvas> <br/><br/>
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            File.extension
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-between">
          <Typography variant="body2" color="textSecondary" component="p">
          1.3 mb
          </Typography>
          <TextButton
            textContent="Download"
            startIcon={<SystemUpdateAltOutlinedIcon />}
            color="primary"
          />
        </Grid>
      </CardActions>
    </Card>
  );
}
