import { useCallback } from 'react'
import useToast from '../useToast'
import usePageLoading from '../usePageLoading'

const useHandledRequest = () => {
  const { showToast, dismissToast } = useToast()
  const { showLoading, dismissLoading } = usePageLoading()

  const request = useCallback(({
    request,
    onSuccess = () => {},
    showFullPageLoading,
    successMessage,
    specificLoading = {}
  }) => async (data) => {

    dismissToast()
    showFullPageLoading && showLoading()
    specificLoading.show && specificLoading.show()

    try {
      const response = await request(data)
      onSuccess(response.data)
      successMessage && showToast({ 
        message: successMessage,
        severity: 'success'
      }) 

    } catch(error) {
      showToast({ message: error.message, severity: 'danger' }) 
    } finally {
      showFullPageLoading && dismissLoading()
      specificLoading.dismiss && specificLoading.dismiss()
    }
  }, [])

  return request
}

export default useHandledRequest
