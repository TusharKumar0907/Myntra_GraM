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

function App() {


  const { auth,status } = useSelector(state => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refreshToken())
  // },[dispatch]);


  useEffect(() => {
    dispatch(getPosts(auth.token))
  },[dispatch, auth.token]);

  return (

    <BrowserRouter>
      
      { auth.token && <Header /> }

      { status && <StatusModal /> } 

      <div className="App">
        <div className="main">
    
      <Routes>
      <Route exact path="/" Component={auth.token ? Home : Login}/>
      <Route exact path="/:page" Component={ PageRender } />
      <Route exact path="/:page/:id" Component={ PageRender } />   
      </Routes>
      </div>
      </div>

      
    </BrowserRouter>

  );
}

export default App;
