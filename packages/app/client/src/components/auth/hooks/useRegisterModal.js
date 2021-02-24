import React from 'react'

export const useRegisterModal = (history, redirectTo) => {
  const [isOpenJoinModal, setIsOpenJoinModal] = React.useState(false)
  React.useEffect(() => {
    if (history.location.hash === '#register') {
      setIsOpenJoinModal(true)
    }
  }, [history.location.hash])

  const handleCloseJoinModal = () => {
    setIsOpenJoinModal(!isOpenJoinModal)
    history.push(redirectTo)
  }

  return { handleCloseJoinModal, isOpenJoinModal }
}
