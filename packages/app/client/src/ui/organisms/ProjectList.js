import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ATRIUM_CONSTANTS } from '../../unin-constants'
import { createSelector } from 'reselect'
import orderBy from 'lodash/orderBy'
import { ProjectCard } from '..'
import { toggleLikeProject as toggleLikeProjectAction } from '../../actions/projectActions'
import { Typography, withStyles } from '@material-ui/core'
import { PROJECT_FILTER_ENUM } from '../../unin-constants'

const styles = theme => ({
  noProjectsText: {
    marginTop: 64,
    fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '1.8px'
  }
})

const ProjectList = ({
  userId,
  toggleLikeProject,
  projects,
  filter,
  setFilter,
  classes
}) => {
  if (!projects || !projects.length) {
    if (filter.search) {
      return (
        <Typography
          variant="h5"
          align="center"
          className={classes.noProjectsText}
        >
          No projects match your search
        </Typography>
      )
    }
    return (
      <Typography align="center" className={classes.noProjectsText}>
        There are currently no projects on The Atrium
      </Typography>
    )
  }

  return projects.map((project, k) => {
    return (
      <ProjectCard
        key={k}
        projectId={project.id}
        name={project.name}
        projectOwner={project.projectOwner}
        projectOwnerEmail={project.projectOwnerEmail}
        owner={project.owner}
        tags={project.tags}
        setFilter={setFilter}
        createdAt={project.createdAt}
        details={project.details}
        linkToRepo={project.linkToRepository}
        numberOfLikes={project.likes && project.likes.length}
        numberOfComments={project.comments && project.comments.length}
        isLiked={
          project.likes && !!project.likes.find(like => like.id === userId)
        }
        toggleLikeProject={toggleLikeProject}
        email={
          project.email ? project.email : ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT
        }
      />
    )
  })
}

ProjectList.propTypes = {
  userId: PropTypes.string.isRequired,
  toggleLikeProject: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  classes: PropTypes.object
}

// get all projects available in store
const getProjects = state => state.projects.allProjects

// get current search
const getSearchFilter = (state, filter) =>
  filter.search ? filter.search.toLowerCase() : ''

// get current sort
const getSort = (state, filter) => filter.sort

/**
 * Selector to get sorted and filtered project list
 */
const projectSelector = createSelector(
  [getProjects, getSearchFilter, getSort],
  (projects, search, sort) => {
    let sortedProjects = projects
    if (sort) {
      let sortModifier
      switch (sort.value) {
        case PROJECT_FILTER_ENUM.POPULARITY:
          sortModifier = [p => p.likes.length]
          break
        case PROJECT_FILTER_ENUM.DISCUSSION:
          sortModifier = [p => p.comments.length]
          break
        case PROJECT_FILTER_ENUM.TIME:
        default:
          sortModifier = ['createdAt']
          break
      }
      sortedProjects = orderBy(projects, sortModifier, [sort.direction])
    }
    if (search) {
      return sortedProjects.filter(
        proj =>
          proj.tags
            .join('')
            .toLowerCase()
            .includes(search) ||
          proj.name.toLowerCase().includes(search) ||
          proj.details.toLowerCase().includes(search) ||
          proj.linkToRepository.toLowerCase().includes(search) ||
          proj.owner.name.toLowerCase().includes(search) ||
          proj.owner.email.toLowerCase().includes(search)
      )
    }

    return sortedProjects
  }
)

const mapStateWithProps = (state, ownProps) => {
  return {
    userId: state.auth.user.id,
    projects: projectSelector(state, ownProps.filter)
  }
}

export default withStyles(styles)(
  connect(mapStateWithProps, {
    toggleLikeProject: toggleLikeProjectAction
  })(ProjectList)
)
