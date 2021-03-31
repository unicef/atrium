import { useDispatch } from 'react-redux'
import { SHOW_TOAST, DISMISS_TOAST } from '../../actions/types'

const useToast = () => {
  const dispatch = useDispatch()

  const showToast = ({ message, severity } ) => {
    dispatch({ type: SHOW_TOAST, payload: { message, severity } })
  }

  const dismissToast = () => {
    dispatch({ type: DISMISS_TOAST })
  }

  return { showToast, dismissToast }
}

export default useToast
