import { useDispatch } from 'react-redux'
import {
  SET_CURRENT_USER  
} from '../../../actions/types'

const useUsersActions = () => {
  const dispatch = useDispatch()

  return {
    setCurrentUser: (payload) => { dispatch({ payload, type: SET_CURRENT_USER }) }
  }
}

export default useUsersActions
