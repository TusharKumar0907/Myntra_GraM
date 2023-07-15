import { combineReducers } from 'redux';
import auth from './authReducer.js';
import alert from './alertReducer.js';

export default combineReducers({
    auth,
    alert
});