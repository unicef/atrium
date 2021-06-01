import React from 'react'
import PropTypes from 'prop-types'
import { DISCUSSION_FILTER_ENUM } from '../../unin-constants'
import { compose } from 'recompose'
import { Formik } from 'formik'
import { Grid, Select, MenuItem } from '@material-ui/core'
import { guideWrapper } from '../../components/guide-wrapper'
import {
  FilterableListTemplate,
  PageFilter,
  FabButton,
  TitledModal,
  TextField,
  Button,
  DiscussionList,
  ForumIntroImg,
  PurposeBlurb
} from '../'
import { connect } from 'react-redux'
import {
  createNewDiscussion as createNewDiscussionAction,
  getAllDiscussions as getAllDiscussionsAction
} from '../../reducers/discussionReducer'

// Really? What an amazing use case for making its own component
const filterOptions = Object.values(DISCUSSION_FILTER_ENUM).map(val => ({
  label: val.replace('&', ' & '),
  value: val
}))

const DiscussionPage = ({
  classes,
  createNewDiscussion,
  getAllDiscussions,
  ...props
}) => {
  const [filter, setFilter] = React.useState({
    search: '',
    sort: ''
  })
  const [newDiscussionModalOpen, setModalOpen] = React.useState(false)

  React.useEffect(() => {
    getAllDiscussions()
  }, [getAllDiscussions])

  const submitNewDiscussion = values => {
    createNewDiscussion(values, () => setModalOpen(false))
  }

  return (
    <>
      <FilterableListTemplate
        filterComponent={
          <PageFilter
            filter={filter}
            setFilter={setFilter}
            searchPlaceholder={'SEARCH FORUM'}
            filterOptions={filterOptions}
            sortLabel={'FILTER LIST'}
          />
        }
        listComponent={
          <>
            <PurposeBlurb
              cacheKey={'forumBlurb'}
              title={'Engage with the community'}
              explanation={
                'The Atrium is built with collaboration and community in-mind. Members of the Atrium are encouraged to engage with colleagues across the UN that are also interested in blockchain.'
              }
              buttonText={'Hide Intro'}
              image={ForumIntroImg}
              altImage={'Welcome to the forum'}
            />
            <DiscussionList filter={filter} />
          </>
        }
        fabButton={
          <FabButton
            type="submit"
            color="primary"
            size="small"
            id="create-post-btn"
            onClick={() => setModalOpen(true)}
          >
            CREATE POST
          </FabButton>
        }
      />
      <TitledModal
        title={'Create post'}
        description="You can ask a question, request for a new feature or report a bug through your post."
        open={newDiscussionModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Formik
          initialValues={{
            type: filterOptions[0].value,
            title: '',
            content: ''
          }}
          validate={values => {
            const errors = {}

            if (!values.title) {
              errors.title = 'required'
            }

            if (!values.content) {
              errors.content = 'required'
            }

            return errors
          }}
          onSubmit={submitNewDiscussion}
          render={({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Select
                    name="type"
                    id="type"
                    value={`${values.type}`}
                    onChange={handleChange}
                    fullWidth
                  >
                    {filterOptions.map(opt => (
                      <MenuItem key={`opt-${opt.value}`} value={opt.value}>
                        #{opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    label="Post heading"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.title && touched.title)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="content"
                    name="content"
                    placeholder="Post description"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.content && touched.content)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth color="primary">
                    PUBLISH POST
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </TitledModal>
    </>
  )
}

DiscussionPage.propTypes = {
  createNewDiscussion: PropTypes.func.isRequired,
  getAllDiscussions: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default compose(
  guideWrapper,
  connect(null, {
    createNewDiscussion: createNewDiscussionAction,
    getAllDiscussions: getAllDiscussionsAction
  })
)(DiscussionPage)
