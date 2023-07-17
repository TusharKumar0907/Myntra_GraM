import { combineReducers } from 'redux';
import auth from './authReducer.js';
import alert from './alertReducer.js';
import theme from './themeReducer.js';

export default combineReducers({
    auth,
    alert,
    theme
});