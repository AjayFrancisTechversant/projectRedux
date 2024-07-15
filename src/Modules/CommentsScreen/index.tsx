import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {useDispatch, useSelector} from 'react-redux';
import CommentsContainer from '../../Components/CommentsContainer';
import AddCommentButton from '../../Components/AddCommentButton';
import {
  addComment,
  deleteComment,
  fetchComments,
  updateComment,
} from '../../Redux/Comments/actions';
import {addNewComment} from '../../Services/API/CommentsAPIs';
import styles from './style';
import {NewCommentDetailsType, UpdatingCommentDetailsType} from '../../types/types';

const CommentsScreen = () => {
  const dispatch = useDispatch();
  const {comments, loading, error} = useSelector(state => state.comments);
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddComment = async (newCommentDetails: NewCommentDetailsType) => {
    try {
      const newlyAddedComment = await addNewComment(newCommentDetails);
      dispatch(addComment(newlyAddedComment));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteComment = async (id:number) => {
    try {
      dispatch(deleteComment(id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateComment = async (updatingCommentDetails:UpdatingCommentDetailsType) => {
    try {
      dispatch(updateComment(updatingCommentDetails));
    } catch (error) {
      console.log(error);
    }
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.MenuDrawerButton}></View>
      <View style={screenStyles.plusButtonContainer}>
        <AddCommentButton handleAddComment={handleAddComment} />
      </View>
      <View style={[screenStyles.flexDRow, screenStyles.headingContainer]}>
        <Text style={screenStyles.heading}>Comments</Text>
      </View>
      <CommentsContainer
        comments={comments}
        loading={loading}
        handleDeleteComment={handleDeleteComment}
        handleUpdateComment={handleUpdateComment}></CommentsContainer>
    </View>
  );
};

export default React.memo(CommentsScreen);
