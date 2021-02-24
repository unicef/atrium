import React from 'react'

const RESPONSE_MODAL_ACTIONS = {
  EMAIL_SENT_SUCCESS: 'EMAIL_SENT_SUCCESS',
  ERROR: 'ERROR',
  CLOSE_MODAL: 'CLOSE_MODAL'
}

const initialState = {
    isResponseModalOpen: false,
    response: '',
    isError: false
}

function reducer(state, action) {
  switch (action.type) {
    case RESPONSE_MODAL_ACTIONS.EMAIL_SENT_SUCCESS:
      return { isResponseModalOpen: true, isError: false, response: action.payload }
    case RESPONSE_MODAL_ACTIONS.ERROR:
      return { isResponseModalOpen: true, isError: true, response: action.payload }
    case RESPONSE_MODAL_ACTIONS.CLOSE_MODAL:
        return { ...state, isResponseModalOpen: false}
    default:
      return state
  }
}

export const useResponseModal = (history, onSuccessRedirectTo) => {
  const [ { isResponseModalOpen, response, isError }, dispatch ] = React.useReducer(reducer, initialState)
  const handleCloseResponseModal = () => {
    dispatch({ type: RESPONSE_MODAL_ACTIONS.CLOSE_MODAL })
    if(!isError) {
        history.push(onSuccessRedirectTo) 
    }
  }

  return { isResponseModalOpen, response, handleCloseResponseModal, dispatch, RESPONSE_MODAL_ACTIONS }
}
