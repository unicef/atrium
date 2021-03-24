import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const useIsMobileViewPort = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  return matches
}

export default useIsMobileViewPort
