import * as UsersApi from '../../../api/users'
import * as ProjectApi from '../../../api/projects'
import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import { useProfileActions } from '../actions'
import { useSelector } from 'react-redux'
import { getProfileId } from '../../../selectors'
 
const useProfileAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { saveUserInformation, saveProfileProjects, likeProfileProject } = useProfileActions()
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
  }
}

export default useProfileAsyncActions
