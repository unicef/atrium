import { useDispatch } from 'react-redux'
import { saveUserInformation } from '../../../reduxStructures/profile'

const useProfileActions = () => {
  const dispatch = useDispatch()

  return {
    saveUserInformation: (payload) => { dispatch(saveUserInformation(payload)) },
  }
}

export default useProfileActions