import * as UsersApi from '../../../api/users'
import * as ProjectApi from '../../../api/projects'
import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import { useProfileActions } from '../actions'
import { useSelector } from 'react-redux'
import { getProfileId } from '../../../selectors'
 
const useProfileAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { saveUserInformation, saveProfileProjects, likeProfileProject, saveProfileActivities } = useProfileActions()
  const isUserAuthenticated = useIsAuthenticated()
  const profileId = useSelector(getProfileId)
  
  return {
    getUserInfoById: handledRequest({
      request: UsersApi.getUserInformation,
      onSuccess: (payload) => saveUserInformation(payload),
      pageLoading: false
    }),
    getProjects: (query) => {
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

      request(query)
    },
    toggleLike: handledRequest(
      { 
        request: ProjectApi.toggleProjectLike,
        onSuccess: ({ project }) => {
          likeProfileProject(project)
        },
        successMessage: 'Action successfully performed'
      }
    ),
    getMoreActivities: (offset, setLoading) => {
      const request = handledRequest(
        { 
          request: UsersApi.getUserActivities,
          onSuccess: (activities) => {
            saveProfileActivities(activities)
          },
          specificLoading: {
            show: () => setLoading(true),
            dismiss: () => setLoading(false)
          }
        }
      )

      request(offset)
    },
  }
}

export default useProfileAsyncActions
