import { useDispatch } from 'react-redux'
import { saveUserInformation, saveProfileProjects, likeProfileProject, saveProfileActivities } from '../../../reduxStructures/profile'

const useProfileActions = () => {
  const dispatch = useDispatch()

  return {
    saveUserInformation: (payload) => { dispatch(saveUserInformation(payload)) },
    saveProfileProjects: (payload) => { dispatch(saveProfileProjects(payload)) },
    likeProfileProject: (payload) => { dispatch(likeProfileProject(payload)) },
    saveProfileActivities: (payload) => { dispatch(saveProfileActivities(payload)) }
  }
}

export default useProfileActions