import axios from "axios";
//fetch all comments 
export const fetchAllComments=async()=>{
    try {
        let response = await axios.get(`https://dummyjson.com/comments?limit=5`);
        return response.data.comments;
      } catch (error) {
        console.log(error);
      }
}
//add a new comment
export const addNewComment = async newCommentDetails => {
  try {
    const {body, postId, userId} = newCommentDetails;
    let response = await axios.post(
      'https://dummyjson.com/comments/add',
      {
        body,
        postId,
        userId,
      },
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//update a comment
export const updateComment = async updatingCommentDetails => {
  try {
    const {id, editedBody} = updatingCommentDetails;
    let response = await axios.put(
      `https://dummyjson.com/comments/${id}`,
      {
        body: editedBody,
      },
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
