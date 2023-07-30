import { GLOBALTYPES, EditData, DeleteData } from "./globalTypes.js";
import { POST_TYPES } from "./postAction.js";
import { postDataAPI, patchDataAPI } from "../../utils/fetchData.js";


export const createComment =  (post, newComment, auth) => async(dispatch) =>  {
    
    // console.log({post, newComment, auth});

    const newpost = {...post, comments: [...post.comments, newComment]};
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newpost});

    try {
        const data = {...newComment, postId: post._id}
        const res = await postDataAPI('comment', data, auth.token);
        console.log(res);
        
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