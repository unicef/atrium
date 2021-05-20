import { useDispatch } from 'react-redux'
import { saveUserInformation, saveProfileProjects, likeProfileProject } from '../../../reduxStructures/profile'

const useProfileActions = () => {
  const dispatch = useDispatch()

  return {
    saveUserInformation: (payload) => { dispatch(saveUserInformation(payload)) },
    saveProfileProjects: (payload) => { dispatch(saveProfileProjects(payload)) },
    likeProfileProject: (payload) => { dispatch(likeProfileProject(payload)) }
  }
}

export default useProfileActions