import { useDispatch } from 'react-redux'
import { saveUserProjects } from '../../../reduxStructures/users'

const useUserProjectsMainActions = () => {
  const dispatch = useDispatch()
  return {
    saveSearchedUserProjects: payload => {
      dispatch(saveUserProjects(payload))
    }
  }
}

export default useUserProjectsMainActions
