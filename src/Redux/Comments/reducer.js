import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from './types';

const initialState = {
  loading: false,
  comments: [],
  error: '',
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: '',
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        comments: [],
        error: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,
        error: '',
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    case UPDATE_COMMENT:
      const {editedBody, id} = action.payload;
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === id ? {...comment, body: editedBody} : comment,
        ),
      };
    default:
      return state;
  }
};

export default commentsReducer;
