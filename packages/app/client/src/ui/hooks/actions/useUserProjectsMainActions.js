import { useDispatch } from 'react-redux'
import {
  saveUserProjects,
  saveUserLikes,
  saveUserLatestProject
} from '../../../reduxStructures/users'

const useUserProjectsMainActions = () => {
  const dispatch = useDispatch()
  return {
    saveSearchedUserProjects: payload => {
      dispatch(saveUserProjects(payload))
    },
    saveSearchedUserLikes: payload => {
      dispatch(saveUserLikes(payload))
    },
    saveSearchedUserLatestProject: payload => {
      dispatch(saveUserLatestProject(payload))
    }
  }
}

export default useUserProjectsMainActions
