import { useDispatch } from 'react-redux'
import { saveUserBookmarks } from '../../../reduxStructures/users'

const useUserBookmarksMainActions = () => {
  const dispatch = useDispatch()
  return {
    saveSearchedUserBookmarks: payload => {
      dispatch(saveUserBookmarks(payload))
    }
  }
}

export default useUserBookmarksMainActions
