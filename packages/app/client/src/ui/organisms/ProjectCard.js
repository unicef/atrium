import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import EditDeletePopover from '../../components/edit-delete-popover'
import { deleteProject } from '../../actions/projectActions'
import { ShadedPaper, ProjectCardActions, UserLink, TagsList } from '../'
import { getRelativeTimeToNow } from '../../utils/timeManipulation'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(4),
    boxShadow: 'none',
    overflow: 'visible',
    borderBottom: 'solid 1px #e2e2e2',
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  cardContent: {
    position: 'relative'
  },
  edit: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  title: {
    marginBottom: 4,
    color: theme.colors['dark-forest-green'],
    overflowWrap: 'break-word'
  },
  pos: {
    marginTop: 5,
    marginBottom: 25,
    color: theme.colors['warm-gray'],
    '& > b': {
      color: theme.colors['shamrock-green']
    }
  },
  details: {
    overflowWrap: 'break-word',
    fontFamily: 'Roboto',
    fontSize: 19,
    lineHeight: 1.42,
    color: theme.colors['black']
  }
}))

function ProjectCard(props) {
  const classes = useStyles()
  const [editting, setEditting] = React.useState(false)
  const authId = props.auth.user.id
  const ownerId = props.owner.id

  const handleTagClick = obj =>
    props.setFilter(filter => ({
      ...filter,
      search: obj
    }))
  const { details } = props
  const trimmedDetails = React.useMemo(() => {
    return details.length && details.length >= 161
      ? `${details.substring(0, 160)}...`
      : details
  }, [details])

  const projectData = {
    projectId: props.projectId,
    projectName: props.name,
    projectUrl: props.linkToRepo,
    projectDescription: props.details,
    projectOwner: props.projectOwner,
    projectOwnerEmail: props.projectOwnerEmail,
    email: props.email,
    projectTags: props.tags,
    websiteLink: props.websiteLink,
    attachment: props.attachment
  }

  const linkify = inputText => {
    var replacedText, replacePattern1, replacePattern2, replacePattern3

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
    replacedText = inputText.replace(
      replacePattern1,
      '<a href="$1" target="_blank">$1</a>'
    )

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
    replacedText = replacedText.replace(
      replacePattern2,
      '$1<a href="http://$2" target="_blank">$2</a>'
    )

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
    replacedText = replacedText.replace(
      replacePattern3,
      '<a href="mailto:$1">$1</a>'
    )

    return replacedText
  }

  return (
    <Card raised={false} className={classes.card}>
      <ShadedPaper className={classes.cardContent}>
        {authId === ownerId ? (
          <div className={classes.edit}>
            <EditDeletePopover
              onEditClick={setEditting}
              deleteRedirectUrl={window.location.href}
              projectId={props.projectId}
              type={'project'}
              onDeleteClick={() => {
                props.deleteProject(props.projectId, () => {
                  window.location.replace('/view-projects')
                })
              }}
            />
          </div>
        ) : null}
        <Link to={`/project-details/${props.projectId}`}>
          <Typography variant="h2" className={classes.title}>
            {props.name}
          </Typography>
        </Link>
        <Typography variant="subtitle1" component="p" className={classes.pos}>
          Uploaded by{' '}
          <UserLink
            id={props.owner.id}
            name={`${props.owner.name} | ${props.owner.company}`}
          />{' '}
          {getRelativeTimeToNow(props.createdAt)} ago
        </Typography>
        <Typography component="p" className={classes.details}>
          <div dangerouslySetInnerHTML={{ __html: linkify(trimmedDetails) }} />
        </Typography>
        <TagsList tags={props.tags} onClickTag={handleTagClick} />
      </ShadedPaper>
      <ProjectCardActions
        id={props.projectId}
        onLikeClick={() => props.toggleLikeProject(props.projectId)}
        isLiked={props.isLiked}
        numberOfLikes={props.numberOfLikes}
        numberOfComments={props.numberOfComments}
        linkToRepo={props.linkToRepo}
      />
    </Card>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { deleteProject })(ProjectCard)

ProjectCard.propTypes = {
  createdAt: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  details: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  linkToRepo: PropTypes.string,
  toggleLikeProject: PropTypes.func.isRequired
}
