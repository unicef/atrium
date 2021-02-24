import React from 'react'

export const useRedirectIfAuthenticated = (history, auth) => {
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/learn')
    }
  }, [auth, history])
}
