import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { withModals } from './modals'
import { guideWrapper } from '../guide-wrapper'
import {
  FabButton,
  PageFilter,
  ProjectList,
  FilterableListTemplate,
  PurposeBlurb,
  ProjectsIntroImg
} from '../../ui'
import { getAllProjects as getAllProjectsActions } from '../../actions/projectActions'
import { PROJECT_FILTER_ENUM } from '../../unin-constants'

const styles = theme => ({
  '@global': {
    body: {
      position: 'relative'
    }
  }
})

const filterOptions = Object.keys(PROJECT_FILTER_ENUM).map(key => ({
  label: key,
  value: key
}))

const ProjectPage = ({ classes, getAllProjects, ...props }) => {
  const [filter, setFilter] = React.useState({
    search: '',
    sort: ''
  })

  React.useEffect(() => {
    getAllProjects()
  }, [getAllProjects])

  const handleOpenModal = () => {
    props.modals.openPreCreate()
  }

  return (
    <FilterableListTemplate
      filterComponent={
        <PageFilter
          filter={filter}
          setFilter={setFilter}
          searchPlaceholder={'SEARCH PROJECTS'}
          filterOptions={filterOptions}
        />
      }
      listComponent={
        <>
          <PurposeBlurb
            cacheKey={'projectsBlurb'}
            title={'Share projects, accelerate innovation'}
            explanation={
              'Is your agency developing a blockchain project? Share it here! You can also view other projects to begin collaborating.'
            }
            buttonText={'Hide Intro'}
            image={ProjectsIntroImg}
            altImage={'Welcome to projects'}
          />
          <ProjectList filter={filter} setFilter={setFilter} />
        </>
      }
      fabButton={
        <FabButton
          type="submit"
          color="primary"
          size="small"
          id="add-project-btn"
          onClick={handleOpenModal}
        >
          Add a project
        </FabButton>
      }
    />
  )
}

ProjectPage.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  modals: PropTypes.object.isRequired
}

export default compose(
  guideWrapper,
  withModals,
  connect(null, { getAllProjects: getAllProjectsActions }),
  withStyles(styles)
)(ProjectPage)
