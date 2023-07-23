import { GLOBALTYPES } from '../actions/globalTypes.js'

const initialState = {};

const authReducer = (state = initialState, action) => {
    // console.log(action.pa)
    switch(action.type){
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;