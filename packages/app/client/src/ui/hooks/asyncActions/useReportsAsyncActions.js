import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as ReportApi from '../../../api/reports'
import { useSearchActions, useReportsActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useReportsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading } = useSearchActions()
  const { saveSearchedReports } = useReportsActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedReports: handledRequest({
      request: ReportApi.getReports,
      onSuccess: ({ comments, projects, updates }) => {
        saveSearchedReports({
          comments,
          projects,
          updates,
          registeredUser: isUserAuthenticated,
          userId
        })
      },
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      }
    })
  }
}

export default useReportsAsyncActions
