import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import {
  ProjectCardActions,
  UserLink,
  CommentBox,
  TagsList,
  AttachmentPreview,
  BackArrow,
  WebLink,
  Contact
} from '../..'
import { getAttachment, getProject } from '../../../api/projects'
import {
  toggleLikeProject as toggleLikeProjectAction,
  addCommentToProject as addCommentToProjectAction
} from '../../../actions/projectActions'
import { setError } from '../../../actions/errorActions'
import { getRelativeTimeToNow } from '../../../utils/timeManipulation'
import { StandardVerticalTemplate } from '../../templates'
import { useFetchProjectWithCache } from './useFetchProjectWithCache'
import EditDeletePopover from '../../../components/edit-delete-popover'
import { deleteProject } from '../../../actions/projectActions'

const useStyles = makeStyles(theme => ({
  pageTemplate: {
    minWidth: 600,
    marginTop: 50,
    flex: 1,
    overflowX: 'hidden',
    alignSelf: 'center',
    padding: '45px 0'
  },
  card: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    boxShadow: 'none',
    overflowWrap: 'break-word',
    borderBottom: 'solid 1px #e2e2e2',
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    },
    position: 'relative'
  },
  title: {
    marginBottom: 4,
    color: theme.colors['dark-forest-green'],
    overflowWrap: 'break-word'
  },
  uploadedBy: {
    marginTop: 5,
    marginBottom: 25,
    color: theme.colors['warm-gray'],
    '& > b': {
      color: theme.colors['shamrock-green']
    }
  },
  details: {
    overflowWrap: 'break-word',
    fontFamily: theme.typography.fontFamily,
    fontSize: 19,
    lineHeight: 1.42,
    color: theme.colors['black']
  },
  tagWrapper: {
    borderBottom: 'solid 1px #e2e2e2',
    marginBottom: '2rem'
  },
  extraDetailContainer: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column'
  },
  extraDetailTitle: {
    fontSize: 15,
    letterSpacing: 0.5,
    color: theme.colors['black'],
    fontFamily: theme.typography.fontFamily,
    marginBottom: '0.5rem'
  },
  extraDetailText: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors['shamrock-green'],
    fontFamily: theme.typography.fontFamily,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  extraDetailTextNoHover: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors['shamrock-green'],
    fontFamily: theme.typography.fontFamily,
  },
  edit: {
    position: 'absolute',
    right: 5,
    top: 5
  }
}))

const getAttachmentName = attachment => {
  if (attachment) {
    const attachbits = attachment.split('/')
    return attachbits[attachbits.length - 1]
  }
}

const linkify = inputText => {
  var replacedText, replacePattern1, replacePattern2, replacePattern3

  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  )

  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  )

  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  )

  return replacedText
}

const ProjectDetails = ({
  cachedProject,
  addCommentToProject,
  toggleLikeProject,
  setError,
  userId,
  match,
  deleteProject
}) => {
  const classes = useStyles()

  const projectId = match.params.id
  const { project, attachmentSource } = useFetchProjectWithCache({
    projectId,
    getProject,
    getAttachment,
    cachedProject,
    setError
  })

  if (!project) return null // You have to do this here/below like you had because there is no default state for project. That's why it crashes without these protections. But you use it with hooks so you can't conditionally render and have to run the code above all the time.

  let ownerId
  if (project.owner && project.owner._id) {
    ownerId = project.owner._id
  }

  return (
    <StandardVerticalTemplate className={classes.pageTemplate}>
      <BackArrow dest={'/view-projects'} />
      <Card raised={false} className={classes.card}>
        {userId === ownerId ? (
          <div className={classes.edit}>
            <EditDeletePopover
              type={'project'}
              deleteRedirectUrl={'/view-projects'}
              onEditClick={() => {
                window.location.replace(`/project-overview/${projectId}`)
              }}
              onDeleteClick={() => {
                deleteProject(projectId, () => {
                  window.location.replace('/view-projects')
                })
              }}
            />
          </div>
        ) : null}
        <Typography variant="h2" className={classes.title}>
          {project.name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          className={classes.uploadedBy}
        >
          Uploaded by{' '}
          <UserLink
            id={project.owner.id}
            name={`${project.owner.name} | ${project.owner.company}`}
          />{' '}
          {getRelativeTimeToNow(project.createdAt)} ago
        </Typography>
        <Typography
          component="p"
          className={classes.details}
          style={{ marginBottom: project.tags.length ? '0' : '2rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: linkify(project.details) }} />
        </Typography>
        <div
          className={classes.tagWrapper}
          style={{
            paddingBottom: project.tags && project.tags.length ? '1.5rem' : '0'
          }}
        >
          <TagsList tags={project.tags} />
        </div>
        <div className={classes.extraDetailContainer}>
          <Typography variant="p" className={classes.extraDetailTitle}>
            PROJECT OWNER
          </Typography>
          {project.projectOwner ? (
            <Typography
              onClick={() =>
                (document.location.href = `mailto:${project.projectOwnerEmail ||
                  project.owner.email}`)
              }
              variant="p"
              className={classes.extraDetailText}
            >
              {project.projectOwner || project.owner.name}&nbsp;&nbsp;
              <Contact />
            </Typography>
          ) : (
            <Typography variant="p" className={classes.extraDetailTextNoHover}>
              {'N/A'}&nbsp;&nbsp;
            </Typography>
          )}
        </div>
        <div className={classes.extraDetailContainer}>
          <Typography variant="p" className={classes.extraDetailTitle}>
            PROJECT WEBSITE
          </Typography>
          <Typography
            onClick={() => {
              if (project.websiteLink)
                window.open(project.websiteLink, '_blank')
            }}
            variant="p"
            className={
              project.websiteLink
                ? classes.extraDetailText
                : classes.extraDetailTextNoHover
            }
          >
            {project.websiteLink || 'N/A'}&nbsp;&nbsp;
            {project.websiteLink && <WebLink />}
          </Typography>
        </div>
        {project.attachment && (
          <div className={classes.extraDetailContainer}>
            <Typography variant="p" className={classes.extraDetailTitle}>
              ATTACHMENT
            </Typography>
            <AttachmentPreview
              src={attachmentSource}
              fileName={getAttachmentName(project.attachment)}
              noName
            />
          </div>
        )}
      </Card>
      <ProjectCardActions
        id={projectId}
        onLikeClick={() => toggleLikeProject(projectId)}
        isDetailsPage={true}
        isLiked={
          project.likes && !!project.likes.find(like => like.id === userId)
        }
        numberOfLikes={project.likes && project.likes.length}
        numberOfComments={project.comments && project.comments.length}
        linkToRepo={project.linkToRepository}
      />
      <CommentBox
        onFormSubmit={addCommentToProject}
        projectId={projectId}
        comments={project.comments}
      />
    </StandardVerticalTemplate>
  )
}

ProjectDetails.propTypes = {
  match: PropTypes.object.isRequired,
  projectCache: PropTypes.object,
  userId: PropTypes.string.isRequired,
  addCommentToProject: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  toggleLikeProject: PropTypes.func.isRequired
}

const mapStateWithProps = (state, ownProps) => ({
  userId: state.auth.user.id,
  cachedProject: state.projects.allProjects.find(
    project => project.id === ownProps.match.params.id
  )
})

export default connect(mapStateWithProps, {
  toggleLikeProject: toggleLikeProjectAction,
  addCommentToProject: addCommentToProjectAction,
  setError: setError,
  deleteProject
})(ProjectDetails)
