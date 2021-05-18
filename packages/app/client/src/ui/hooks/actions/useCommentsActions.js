import { useDispatch } from 'react-redux'
import { saveComments, updateComment } from '../../../reduxStructures/projects'

const useCommentsActions = () => {
  const dispatch = useDispatch()

  return {
    saveComments: (payload) => { dispatch(saveComments(payload)) },
    updateComment: (payload) => { dispatch(updateComment(payload)) }
  }
}

export default useCommentsActions