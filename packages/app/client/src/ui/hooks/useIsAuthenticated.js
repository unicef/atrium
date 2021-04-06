import { useSelector } from 'react-redux'
import { isAuthenticated } from '../../selectors'

const useIsAuthenticated = () => {
  const isUserAuthenticated = useSelector(isAuthenticated)

  return isUserAuthenticated
}

export default useIsAuthenticated
