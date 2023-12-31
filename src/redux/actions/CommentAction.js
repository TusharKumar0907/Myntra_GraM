import { GLOBALTYPES, EditData, DeleteData } from "./globalTypes.js";
import { POST_TYPES } from "./postAction.js";
import { postDataAPI, patchDataAPI } from "../../utils/fetchData.js";


export const createComment =  (post, newComment, auth, socket) => async(dispatch) =>  {
    
    // console.log({post, newComment, auth});

    const newpost = {...post, comments: [...post.comments, newComment]};
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newpost});

    try {
        const data = {...newComment, postId: post._id}
        const res = await postDataAPI('comment', data, auth.token);
        // console.log(res);

        const newData = {...res.data.newComment, user: auth.user}
        const newPost = {...post, comments: [...post.comments, newData]}

        socket.emit('createComment', newPost);
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }

}

export const updateComment = ({comment, post, content, auth}) => async (dispatch) => {
    
    const newComments = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newComments}
    
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
        patchDataAPI(`comment/${comment._id}`, { content }, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }

}

export const likeComment = ({comment, post, auth}) => async (dispatch) => {
    
    const newComment = {...comment, likes: [...comment.likes, auth.user]}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const UnLikeComment = ({comment, post, auth}) => async (dispatch) => {

    const newComment = {...comment, likes: DeleteData(comment.likes, auth.user._id)}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}
