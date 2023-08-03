import { combineReducers } from 'redux';
import auth from './authReducer.js';
import alert from './alertReducer.js';
import theme from './themeReducer.js';
import profile from './ProfileReducer.js';
import status from './statusReducer.js';
import homePost from './postReducer.js';
import suggestions from './suggestionReducer.js';
import socket from './socketReducer.js';

export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePost,
    suggestions,
    socket
});

