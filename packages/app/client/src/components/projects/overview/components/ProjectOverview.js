import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { refreshToken } from '../../../../actions/authActions'
import { editProject } from '../../../../actions/projectActions'
import CirclePercents from './CirclePercents'
import { Button } from '../../../../ui'
import { useHistory } from 'react-router-dom'

const useDefaultStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingTop: '5%'
  },
  header: {
    textAlign: 'left'
  },
  leftBlock: {
    width: '50%',
    paddingRight: '10%'
  },
  rightBlock: {
    paddingLeft: '5%'
  },
  descriptionText: {
    margin: '5% 0 10% 0',
    fontSize: 18
  },
  card: {
    backgroundColor: '#F1F1F1',
    height: '100px',
    borderRadius: '5px',
    marginBottom: '3%',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  circle: {
    margin: '0 5%'
  },
  image: {
    margin: '5% 0'
  },
  input: {
    color: 'black',
    marginTop: '5%'
  },
  cardText: {
    marginLeft: '5%'
  },
  cardHeader: {
    fontSize: '12px',
    marginLeft: '5%',
    color: '#15B54A'
  },
  firstCard: {
    width: '50%',
    paddingLeft: '3%'
  },
  publishButton: {
    width: '105px',
    height: '42px',
    margin: '5% 0 10% 0'
  }
}))

function ProjectOverview(props) {
  const classes = useDefaultStyles()

  const requiredFields = [
    'name',
    'details',
    'blockchainType',
    'blockchainName',
    'stageOfProject',
    'innovationCategory',
    'thematicArea',
    'contactPersonEmail',
    'contactPersonFullName'
  ]

  const additionalFields = [
    'country',
    'organization',
    'numberOfNodes',
    'launchDateYear',
    'launchDateMonth',
    'license'
  ]

  const storyFields = ['story', 'challenges', 'benefits', 'needs', 'section']

  const [requiredPercent, setRequiredPercent] = useState(0)
  const [additionalPercent, setAdditionalPercent] = useState(0)
  const [storyPercent, setStoryPercent] = useState(0)
  const [updateCounter, setUpdateCounter] = useState(0)
  const [membersCounter, setMembersCounter] = useState(0)

  useEffect(() => {
    if (props._id) {
      let required = 0
      let additional = 0
      let story = 0
      for (const key of Object.keys(props)) {
        if (
          requiredFields.includes(key) &&
          props[key] !== '' &&
          props[key] !== []
        ) {
          required++
          continue
        }
        if (
          additionalFields.includes(key) &&
          props[key] !== '' &&
          props[key] !== []
        ) {
          additional++
          continue
        }
        if (storyFields.includes(key) && props[key] !== '' && props[key] !== [])
          story++
      }
      setRequiredPercent(Math.floor((required * 100) / requiredFields.length))
      setAdditionalPercent(
        Math.floor((additional * 100) / additionalFields.length)
      )
      setStoryPercent(Math.floor((story * 100) / storyFields.length))
      setUpdateCounter(props.updates.length)
      setMembersCounter(props.team.length)
    }
  }, [props._id])

  const history = useHistory()
  const clickHandler = async () => {
    await props.editProject(props._id, { published: true }, () =>
      history.push('/projects')
    )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftBlock}>
        <Typography className={classes.header} variant="h3" color="secondary">
          Project Overview
        </Typography>
        <Typography variant="h5" className={classes.descriptionText}>
          Your project can now be shared with the world. Add more information to
          reach more people. You can edit this data at any point
          <Link href="#"> need help?</Link>
        </Typography>
        <div>
          <div onClick={e => props.handleChange(e, 1)} className={classes.card}>
            <CirclePercents value={requiredPercent} text={requiredPercent} />
            <div className={classes.firstCard}>
              <Typography className={classes.cardHeader} variant="subtitle1">
                mandatory
              </Typography>
              <Typography className={classes.cardText} variant="subtitle1">
                {' '}
                Required information
              </Typography>
            </div>
          </div>
          <div onClick={e => props.handleChange(e, 2)} className={classes.card}>
            <CirclePercents
              value={additionalPercent}
              text={additionalPercent}
            />
            <Typography className={classes.cardText} variant="subtitle1">
              Additional information
            </Typography>
          </div>
          <div onClick={e => props.handleChange(e, 3)} className={classes.card}>
            <CirclePercents value={storyPercent} text={storyPercent} />
            <Typography className={classes.cardText} variant="subtitle1">
              Story
            </Typography>
          </div>
          <div onClick={e => props.handleChange(e, 4)} className={classes.card}>
            <CirclePercents
              update={true}
              value={membersCounter === 0 ? 0 : 100}
              text={membersCounter}
            />
            <Typography className={classes.cardText} variant="subtitle1">
              Team
            </Typography>
          </div>
          <div onClick={e => props.handleChange(e, 5)} className={classes.card}>
            <CirclePercents
              update={true}
              value={updateCounter === 0 ? 0 : 100}
              text={updateCounter}
            />
            <Typography className={classes.cardText} variant="subtitle1">
              Update
            </Typography>
          </div>
        </div>
        <Button
          onClick={clickHandler}
          color="primary"
          className={classes.publishButton}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}

ProjectOverview.propTypes = {
  editProject: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(connect(mapStateToProps, { refreshToken, editProject }))(
  ProjectOverview
)
