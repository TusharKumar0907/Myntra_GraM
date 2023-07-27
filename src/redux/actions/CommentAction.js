import { GLOBALTYPES } from "./globalTypes.js";
import { POST_TYPES } from "./postAction.js";
import { postDataAPI } from "../../utils/fetchData.js";


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