import { GLOBALTYPES } from '../actions/globalTypes.js'

const initialState = {};

const StatusReducer = (state = false, action) => {
    // console.log(action.pa)
    switch(action.type){
        case GLOBALTYPES.STATUS:    
            return action.payload;
        default:
            return state;
    }
}

export default StatusReducer;