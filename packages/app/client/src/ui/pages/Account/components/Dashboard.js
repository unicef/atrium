import React from 'react'
import Grid from '@material-ui/core/Grid'
import BorderedInfo from './BorderedInfo'
import Typography from '@material-ui/core/Typography'
import { Button, Image, LikeButton } from '../../../atoms'
import { Badge, Edit } from '../../../assets'
import { makeStyles } from '@material-ui/core/styles'
import { StructuredCard } from '../../../molecules'

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
    width: '85px',
    height: '16px',
    color: '#15B54A',
    backgroundColor: 'white'
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
  editButton: {
    marginRight: '5%',
    width: '107px',
    height: '42px'
  },
  viewProject: {
    width: '139px',
    height: '42px'
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
  },
  editText: {
    marginLeft: '10%'
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
  return (
    <>
      <Typography className={classes.greeting} variant="h3">
        Hello, {props.name}
      </Typography>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo size="normal">
            <Typography className={classes.title} variant="subtitle1">MY STATS</Typography>
            <div className={classes.boxes}>
              <div className={classes.centered}>
                <div className={classes.bordered}>
                  <div className={classes.topText}>
                    <LikeButton liked onlyIcon disabled />
                    <div>Likes</div>
                  </div>
                  <div className={classes.greenLine} />
                  <div className={classes.count}>23</div>
                </div>
                <Button className={classes.buttons} color="primary">
                  Redeem likes
                </Button>
              </div>
              <div className={classes.centered}>
                <div>
                  <div className={classes.bordered}>
                    <div className={classes.topText}>
                      <Image sameSize borderRadius={0} width="18px" height="22px" src={Badge} />
                      <span className={classes.margined}>Badges</span>
                    </div>
                    <div className={classes.greenLine} />
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
          <BorderedInfo size="normal">
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
              <div className={classes.project}>
                <StructuredCard
                  author={'Victor'}
                  date="4/26/2021 2:28"
                  title={'best title for project'}
                  content={
                    'this is the best content for project in the world and its sounds great'
                  }
                />
              </div>
              <div className={classes.margined}>
                <Button
                  className={classes.editButton}
                  color="primary"
                  variant="outlined"
                >
                  <Image sameSize borderRadius={0} width="14px" height="14px" src={Edit} />
                  <span className={classes.editText}>Edit</span>
                </Button>
                <Button
                  className={classes.viewProject}
                  color="primary"
                  variant="outlined"
                >
                  View Project
                </Button>
              </div>
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
                onClick={e => handleChange(e, 5)}
              >
                see all >
              </Button>
            </div>
            <div>
              <StructuredCard
                author={'Vanya'}
                date="4/24/2021 2:28"
                title={
                  'Have you ever wondered how your entity could apply blockchain?'
                }
              />
              <div className={classes.line} />
            </div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo size="large">
            <div className={classes.header}>
              <Typography variant="subtitle1">MY POSTS</Typography>
              <Button
                className={classes.seeAllButton}
                onClick={e => handleChange(e, 3)}
              >
                see all >
              </Button>
            </div>
            <div>
              <StructuredCard
                author="Vanya"
                date="2/22/2021 2:28"
                title="Lets code together"
                content="Lorem Ipsum is simply dummy text of the printing and industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s"
              />
              <div className={classes.line} />
            </div>
          </BorderedInfo>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
