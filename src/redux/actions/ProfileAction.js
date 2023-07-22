import { GLOBALTYPES } from "./globalTypes.js";
import { getDataAPI, patchDataAPI } from '../../utils/fetchData.js'; 


export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
    FOLLOW: 'FOLLOW'
}



export const getProfileUsers = ({users, id, auth}) => async (dispatch) => {
    if(users.every(user => user._id !== id)) {
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true});
            const res = await getDataAPI(`/user/${ id }`, auth.token)
            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: res.data
            });
            dispatch({type: PROFILE_TYPES.LOADING, payload: false});            
        } catch(err) {
            dispatch({type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.msg}
        })

        }
    }   
}

export const updateProfileUser = ({userData, auth}) => async (dispatch) => {

    if(!userData.fullname)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name."}})

    if(userData.fullname.length > 25)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your full name too long."}})

    if(userData.story.length > 200)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your story too long."}})

    try {
        
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await patchDataAPI("user", {
            ...userData,
            avatar: auth.user.avatar
        }, auth.token)

        console.log(res);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: auth.user.avatar,
                }
            }
        })

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.msg}
        })
    }
}


export const follow = ({users, user, auth}) => async (dispatch) => {

    let newUser = {...user, followers: [...user.followers, auth.user]};

    dispatch({
        type: PROFILE_TYPES.FOLLOW,
        payload: newUser
    })

    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }
    })

}