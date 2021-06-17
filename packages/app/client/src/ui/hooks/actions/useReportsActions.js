import { useDispatch } from 'react-redux'
import { saveReports } from '../../../reduxStructures/reports'

const useReportsActions = () => {
  const dispatch = useDispatch()
  return {
    saveSearchedReports: payload => {
      dispatch(saveReports(payload))
    }
  }
}

export default useReportsActions
