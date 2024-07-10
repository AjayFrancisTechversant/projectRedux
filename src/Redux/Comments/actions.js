import {fetchAllComments} from '../../Services/API/CommentsAPIs';
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from './types';

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

export const fetchComments = () => {
  return async dispatch => {
    dispatch(fetchCommentsRequest());
    try {
      const response = await fetchAllComments();
      dispatch(fetchCommentsSuccess(response));
    } catch (error) {
      dispatch(fetchCommentsFailure(error.message));
    }
  };
};

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const deleteComment = commentId => ({
  type: DELETE_COMMENT,
  payload: commentId,
});
export const updateComment = updatingCommentDetails => ({
  type: UPDATE_COMMENT,
  payload: updatingCommentDetails,
});
