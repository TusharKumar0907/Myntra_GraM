import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Header from './components/header/header.js'

import StatusModal from './components/StatusModal.js';

import PageRender from './customRouter/pagerender.js';


import { useSelector, useDispatch } from 'react-redux';

import { refreshToken } from './redux/actions/authAction.js';

import { getPosts } from './redux/actions/postAction.js';
import { getSuggestions } from './redux/actions/suggestionsAction.js';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes.js';

import SocketClient from './SocketClient.js';

function App() {

  const { auth,status } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io();
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close();
  },[dispatch]);


  useEffect(() => {
  if(auth.token) {
    dispatch(getPosts(auth.token))
    dispatch(getSuggestions(auth.token));
  }
  },[dispatch, auth.token]);

  return (

    <BrowserRouter>
      
      { auth.token && <Header /> }

      { status && <StatusModal /> }

      {auth.token && <SocketClient />} 

      <div className="App">
        <div className="main">
    
      <Routes>
      <Route exact path="/" Component={auth.token ? Home : Login}/>
      <Route exact path="/register" Component={auth.token ? Home : Register}/>
      <Route exact path="/:page" Component={ PageRender } />
      <Route exact path="/:page/:id" Component={ PageRender } />   
      </Routes>
      </div>
      </div>

      
    </BrowserRouter>

  );
}

export default App;
