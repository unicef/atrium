import { useDispatch } from 'react-redux'
import { saveUserComments } from '../../../reduxStructures/users'

const useUserCommentsMainActions = () => {
  const dispatch = useDispatch()
  return {
    saveSearchedUserComments: payload => {
      dispatch(saveUserComments(payload))
    }
  }
}

export default useUserCommentsMainActions
