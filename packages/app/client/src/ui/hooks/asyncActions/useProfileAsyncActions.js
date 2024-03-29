import * as UsersApi from '../../../api/users'
import * as ProjectApi from '../../../api/projects'
import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import useToast from '../useToast'
import { useProfileActions } from '../actions'
import { useSelector } from 'react-redux'
import { getProfileId } from '../../../selectors'

const useProfileAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const {
    saveUserInformation,
    saveProfileProjects,
    likeProfileProject,
    saveProfileActivities,
    setLoadMoreActivitiesFlag
  } = useProfileActions()
  const { showToast } = useToast()
  const isUserAuthenticated = useIsAuthenticated()
  const profileId = useSelector(getProfileId)

  return {
    getUserInfoById: handledRequest({
      request: UsersApi.getUserInformation,
      onSuccess: payload => saveUserInformation(payload),
      pageLoading: false
    }),
    getUserProjects: (userId, query) => {
      const request = handledRequest({
        request: UsersApi.getUserProjects,
        onSuccess: ({ projects, pageCounter }) => {
          saveProfileProjects({
            projects,
            pageCounter,
            registeredUser: isUserAuthenticated,
            profileId
          })
        },
        pageLoading: true
      })
      request(userId, query)
    },
    getOwnProjects: query => {
      const request = handledRequest({
        request: UsersApi.getOwnProjects,
        onSuccess: ({ projects, pageCounter }) => {
          saveProfileProjects({
            projects,
            pageCounter,
            registeredUser: isUserAuthenticated,
            profileId
          })
        },
        pageLoading: true
      })
      request(query)
    },
    toggleLike: handledRequest({
      request: ProjectApi.toggleProjectLike,
      onSuccess: ({ project }) => {
        likeProfileProject(project)
      },
      successMessage: 'Action successfully performed'
    }),
    getMoreActivities: (offset, setLoading) => {
      const request = handledRequest({
        request: UsersApi.getUserActivities,
        onSuccess: activities => {
          if (Array.isArray(activities)) {
            saveProfileActivities(activities)

            if (activities.length === 0) {
              setLoadMoreActivitiesFlag('DO_NOT_LOAD')
              showToast({
                message: 'There is no more activities',
                severity: 'info'
              })
            } else {
              setLoadMoreActivitiesFlag('LOAD')
            }
          }
        },
        specificLoading: {
          show: () => setLoading(true),
          dismiss: () => setLoading(false)
        }
      })
      request(offset)
    },
    refreshToken: handledRequest({
      request: UsersApi.refreshToken,
      onSuccess: payload => {
        saveUserInformation(payload)
      },
      pageLoading: false
    })
  }
}

export default useProfileAsyncActions
