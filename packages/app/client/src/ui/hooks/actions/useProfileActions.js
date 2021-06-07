import { useDispatch } from 'react-redux'
import { saveUserInformation, saveProfileProjects, likeProfileProject, saveProfileActivities, setLoadMoreActivitiesFlag } from '../../../reduxStructures/profile'

const useProfileActions = () => {
  const dispatch = useDispatch()

  return {
    saveUserInformation: (payload) => { dispatch(saveUserInformation(payload)) },
    saveProfileProjects: (payload) => { dispatch(saveProfileProjects(payload)) },
    likeProfileProject: (payload) => { dispatch(likeProfileProject(payload)) },
    saveProfileActivities: (payload) => { dispatch(saveProfileActivities(payload)) },
    setLoadMoreActivitiesFlag: (payload) => { dispatch(setLoadMoreActivitiesFlag(payload)) }
  }
}

export default useProfileActions