import { useDispatch } from 'react-redux'
import { saveComments } from '../../../reduxStructures/projects'

const useCommentsActions = () => {
  const dispatch = useDispatch()

  return {
    saveComments: (payload) => { dispatch(saveComments(payload)) }
  }
}

export default useCommentsActions