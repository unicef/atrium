import { useDispatch } from 'react-redux'
import { SHOW_LOADING, DISMISS_LOADING } from '../../actions/types'

const usePageLoading = () => {
  const dispatch = useDispatch()

  const showLoading = () => {
    dispatch({ type: SHOW_LOADING })
  }

  const dismissLoading = () => {
    dispatch({ type: DISMISS_LOADING })
  }

  return { showLoading, dismissLoading }
}

export default usePageLoading
