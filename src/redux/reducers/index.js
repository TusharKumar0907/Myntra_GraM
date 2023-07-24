import { combineReducers } from 'redux';
import auth from './authReducer.js';
import alert from './alertReducer.js';
import theme from './themeReducer.js';
import profile from './ProfileReducer.js';
import status from './statusReducer.js';
import homePost from './postReducer.js';

export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePost
});

