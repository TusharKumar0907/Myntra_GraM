import { combineReducers } from 'redux';
import auth from './authReducer.js';
import notify from './notifyReducer.js';

export default combineReducers({
    auth,
    notify
});