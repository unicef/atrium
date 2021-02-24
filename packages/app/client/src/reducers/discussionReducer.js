import { DATA_STATE_ENUM } from '../unin-constants'
// There were two ways to do this. This makes three ways after merging the previous two...
import * as DiscussionApi from '../api/discussion'

export const discussionActions = {
  GET_ALL_DICUSSIONS: 'GET_ALL_DISCUSSIONS',
  GET_ALL_DICUSSIONS_SUCCESS: 'GET_ALL_DISCUSSIONS_SUCCESS',
  GET_ALL_DICUSSIONS_ERROR: 'GET_ALL_DISCUSSIONS_ERROR',
  DELETE_DISCUSSION: 'DELETE_DISCUSSION',
  CREATE_NEW_DISCUSSION: 'CREATE_NEW_DISCUSSION',
  CREATE_NEW_DISCUSSION_ERROR: 'CREATE_NEW_DISCUSSION_ERROR',
  CREATE_NEW_DISCUSSION_SUCCESS: 'CREATE_NEW_DISCUSSION_SUCCESS',
  EDIT_DISCUSSION: 'EDIT_DISCUSSION',
  EDIT_DISCUSSION_ERROR: 'EDIT_DISCUSSION_ERROR',
  EDIT_DISCUSSION_SUCCESS: 'EDIT_DISCUSSION_SUCCESS',
  GET_DISCUSSION_DETAILS: 'GET_DISCUSSION_DETAILS',
  GET_DISCUSSION_DETAILS_SUCCESS: 'GET_DISCUSSION_DETAILS_SUCCESS',
  GET_DISCUSSION_DETAILS_ERROR: 'GET_DISCUSSION_DETAILS_ERROR',
  ADD_COMMENT_IN_DISCUSSION: 'ADD_COMMENT_IN_DISCUSSION',
  ADD_COMMENT_IN_DISCUSSION_SUCCESS: 'ADD_COMMENT_IN_DISCUSSION_SUCCESS',
  ADD_COMMENT_IN_DISCUSSION_ERROR: 'ADD_COMMENT_IN_DISCUSSION_ERROR',
  TOGGLE_LIKE_IN_DISCUSSION: 'TOGGLE_LIKE_IN_DISCUSSION',
  TOGGLE_LIKE_IN_DISCUSSION_SUCCESS: 'TOGGLE_LIKE_IN_DISCUSSION_SUCCESS',
  TOGGLE_LIKE_IN_DISCUSSION_ERROR: 'TOGGLE_LIKE_IN_DISCUSSION_ERROR'
}

export const addCommentInDiscussion = (
  discussionId,
  comment
) => async dispatch => {
  try {
    dispatch({ type: discussionActions.ADD_COMMENT_IN_DISCUSSION })
    const { data } = await DiscussionApi.addCommentToDiscussion(
      discussionId,
      comment
    )
    dispatch({
      type: discussionActions.ADD_COMMENT_IN_DISCUSSION_SUCCESS,
      payload: data.discussion
    })
  } catch (err) {
    dispatch({
      type: discussionActions.ADD_COMMENT_IN_DISCUSSION_ERROR,
      payload: err.response
    })
  }
}

export const toggleLikeInDiscussion = (
  discussionId,
  discussion
) => async dispatch => {
  console.log(discussion, discussionId)
  try {
    dispatch({ type: discussionActions.TOGGLE_LIKE_IN_DISCUSSION })
    const { data } = await DiscussionApi.toggleLikeInDiscussion(discussionId)
    dispatch({
      type: discussionActions.TOGGLE_LIKE_IN_DISCUSSION_SUCCESS,
      payload: data.discussion
    })
  } catch (err) {
    dispatch({
      type: discussionActions.TOGGLE_LIKE_IN_DISCUSSION_ERROR,
      payload: err.response
    })
  }
}

export const getDiscussionDetails = discussionId => async dispatch => {
  try {
    dispatch({ type: discussionActions.GET_DISCUSSION_DETAILS })
    const { data } = await DiscussionApi.getDiscussionDetails(discussionId)
    dispatch({
      type: discussionActions.GET_DISCUSSION_DETAILS_SUCCESS,
      payload: data.discussion
    })
  } catch (err) {
    dispatch({
      type: discussionActions.GET_DISCUSSION_DETAILS_ERROR,
      payload: err.response
    })
  }
}

export const getAllDiscussions = () => async dispatch => {
  try {
    dispatch({
      type: discussionActions.GET_ALL_DICUSSIONS
    })
    const { data } = await DiscussionApi.getDiscussionList()
    dispatch({
      type: discussionActions.GET_ALL_DICUSSIONS_SUCCESS,
      payload: data.discussions
    })
  } catch (err) {
    dispatch({
      type: discussionActions.GET_ALL_DICUSSIONS_ERROR,
      payload: err.response
    })
  }
}

export const createNewDiscussion = (
  discussion,
  onSuccess
) => async dispatch => {
  try {
    dispatch({
      type: discussionActions.CREATE_NEW_DISCUSSION
    })
    const { data } = await DiscussionApi.createDiscussion(discussion)
    dispatch({
      type: discussionActions.CREATE_NEW_DISCUSSION_SUCCESS,
      payload: data.discussion
    })
    onSuccess()
  } catch (err) {
    dispatch({
      type: discussionActions.CREATE_NEW_DISCUSSION_ERROR,
      payload: err.response
    })
  }
}

export const deleteDiscussion = (discussionId, onSuccess) => async dispatch => {
  try {
    dispatch({
      type: discussionActions.DELETE_DISCUSSION
    })
    await DiscussionApi.deleteDiscussion(discussionId)
    dispatch({
      type: discussionActions.DELETE_DISCUSSION_SUCCESS
    })
    onSuccess()
  } catch (err) {
    dispatch({
      type: discussionActions.CREATE_NEW_DISCUSSION_ERROR,
      payload: err.response
    })
  }
}

export const editDiscussion = (
  discussion,
  discussionId,
  onSuccess
) => async dispatch => {
  try {
    dispatch({
      type: discussionActions.EDIT_DISCUSSION
    })
    await DiscussionApi.editDiscussion(discussion, discussionId)
    dispatch({
      type: discussionActions.EDIT_DISCUSSION_SUCCESS
    })

    onSuccess()
  } catch (err) {
    dispatch({
      type: discussionActions.EDIT_DISCUSSION_ERROR,
      payload: err.response
    })
  }
}

const upsertDiscussionDetails = (state, discussionToUpsert) => {
  const discussionDetailsIndex = state.discussionList.findIndex(
    discussion => discussion.id === discussionToUpsert.id
  )
  const newDiscussionList = [...state.discussionList]
  if (discussionDetailsIndex > -1) {
    newDiscussionList[discussionDetailsIndex] = discussionToUpsert
  } else {
    newDiscussionList.push(discussionToUpsert)
  }

  return newDiscussionList
}

const initialState = {
  discussionList: [],
  dicussionCreationState: DATA_STATE_ENUM.NEW,
  discussionListLoadingState: DATA_STATE_ENUM.NEW,
  discussionDetailsLoadingState: DATA_STATE_ENUM.NEW,
  discussionLikeLoadingState: DATA_STATE_ENUM.NEW,
  discussionCommentLoadingState: DATA_STATE_ENUM.NEW
}

export default function discussionReducer(state = initialState, action) {
  switch (action.type) {
    case discussionActions.GET_ALL_DICUSSIONS:
      return {
        ...state,
        discussionListLoadingState: DATA_STATE_ENUM.LOADING
      }
    case discussionActions.GET_ALL_DICUSSIONS_SUCCESS:
      return {
        ...state,
        discussionList: action.payload,
        discussionListLoadingState: DATA_STATE_ENUM.SUCCESS
      }
    case discussionActions.GET_ALL_DICUSSIONS_ERROR:
      return {
        ...state,
        discussionListLoadingState: DATA_STATE_ENUM.ERROR
      }
    case discussionActions.CREATE_NEW_DISCUSSION:
      return {
        ...state,
        dicussionCreationState: DATA_STATE_ENUM.LOADING
      }
    case discussionActions.CREATE_NEW_DISCUSSION_SUCCESS:
      return {
        ...state,
        discussionList: [action.payload, ...state.discussionList],
        dicussionCreationState: DATA_STATE_ENUM.SUCCESS
      }
    case discussionActions.CREATE_NEW_DISCUSSION_ERROR:
      return {
        ...state,
        dicussionCreationState: DATA_STATE_ENUM.ERROR
      }
    case discussionActions.GET_DISCUSSION_DETAILS:
      return {
        ...state,
        discussionDetailsLoadingState: DATA_STATE_ENUM.LOADING
      }
    case discussionActions.GET_DISCUSSION_DETAILS_SUCCESS:
      return {
        ...state,
        discussionList: upsertDiscussionDetails(state, action.payload),
        discussionDetailsLoadingState: DATA_STATE_ENUM.NEW
      }
    case discussionActions.GET_DISCUSSION_DETAILS_ERROR:
      return {
        ...state,
        discussionDetailsLoadingState: DATA_STATE_ENUM.ERROR
      }
    case discussionActions.ADD_COMMENT_IN_DISCUSSION:
      return {
        ...state,
        discussionCommentLoadingState: DATA_STATE_ENUM.LOADING
      }
    case discussionActions.ADD_COMMENT_IN_DISCUSSION_SUCCESS:
      return {
        ...state,
        discussionList: upsertDiscussionDetails(state, action.payload),
        discussionCommentLoadingState: DATA_STATE_ENUM.NEW
      }
    case discussionActions.ADD_COMMENT_IN_DISCUSSION_ERROR:
      return {
        ...state,
        discussionCommentLoadingState: DATA_STATE_ENUM.ERROR
      }
    case discussionActions.TOGGLE_LIKE_IN_DISCUSSION:
      return {
        ...state,
        discussionLikeLoadingState: DATA_STATE_ENUM.LOADING
      }
    case discussionActions.TOGGLE_LIKE_IN_DISCUSSION_SUCCESS:
      return {
        ...state,
        discussionList: upsertDiscussionDetails(state, action.payload),
        discussionLikeLoadingState: DATA_STATE_ENUM.NEW
      }
    case discussionActions.TOGGLE_LIKE_IN_DISCUSSION_ERROR:
      return {
        ...state,
        discussionLikeLoadingState: DATA_STATE_ENUM.ERROR
      }
    default:
      return state
  }
}
