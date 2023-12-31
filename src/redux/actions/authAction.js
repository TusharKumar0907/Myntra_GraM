import { GLOBALTYPES } from "./globalTypes.js";
import { postDataAPI } from "../../utils/fetchData.js";
import valid from '../../utils/valid'

export const login = (data) => async (dispatch) => {
    try{
        
        dispatch( { type: GLOBALTYPES.ALERT, payload: {loading: true} });
        const res = await postDataAPI('login', data);
        // console.log(res);


        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem("firstLogin", true);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })

    } catch (err) {
        console.log(err);
        dispatch({
            type:GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}


export const refreshToken = () => async (dispatch) => {
  
    const firstLogin = localStorage.getItem("firstLogin");

    console.log(firstLogin);

    if(firstLogin) {
  
        dispatch({ type: GLOBALTYPES.ALERT, payload:{loading:true}})
  
        try {
            const res = await postDataAPI('refresh_token');
            // console.log(res);
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.refresh_token,
                    user: res.data.user
                }
            })

            dispatch({type: GLOBALTYPES.ALERT, payload: {} })
            
        } catch (err) {
             dispatch({
                type:GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
             })
        }
    }
}


export const register = (data) => async (dispatch) => {
    
    // console.log(data);
    
    const check = valid(data)

    // console.log(check);

    if(check.errLength > 0)
    return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI('register', data)
        console.log(res);
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            } 
        })

        localStorage.setItem("firstLogin", true)
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
    } catch (err) {
        console.log(err);
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}