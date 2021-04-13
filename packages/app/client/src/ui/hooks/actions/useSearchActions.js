import { useDispatch } from 'react-redux'
import { sortDesc, sortAsc, showLoading, dismissLoading, addSearchText, changePage } from '../../../reduxStructures/search'

const useSearchActions = () => {
  const dispatch = useDispatch()

  return {
    sortAsc: () => { dispatch(sortAsc()) },
    sortDesc: () => { dispatch(sortDesc()) },
    showLoading: () => { dispatch(showLoading()) },
    dismissLoading: () => { dispatch(dismissLoading()) },
    addSearch: (payload) => { dispatch(addSearchText(payload)) },
    changePage: (payload) => { dispatch(changePage(payload)) },
    resetSearch: () => { dispatch({ type: 'lkjhlkjk' })}
  }
}

export default useSearchActions
