import useToast from '../useToast'
import usePageLoading from '../usePageLoading'

const useAsyncAction = () => {
  const { showToast, dismissToast } = useToast()
  const { showLoading, dismissLoading } = usePageLoading()

  const request = ({ request, onSuccess, pageLoading }) => async (data) => {
    dismissToast()
    pageLoading && showLoading()

    try {
      const response = await request(data)
      onSuccess(response.data)

    } catch(error) {
      showToast({ message: error.message, severity: 'danger' }) 
    } finally {
      pageLoading && dismissLoading()
    }
  }

  return request
}

export default useAsyncAction
