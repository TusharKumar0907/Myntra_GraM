import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home.js';
import Login from './pages/login.js';
import PageRender from './pagerender.js';
import Register from './pages/register.js';
import Header from "./components/header/Header.js";

import { useSelector, useDispatch } from 'react-redux';

import { refreshToken } from './redux/actions/authAction.js';

function App() {


  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refreshToken())
  // },[dispatch]);

  return (

    <BrowserRouter>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
      { auth.token && <Header /> }
      <Routes>
      <Route exact path="/" Component={auth.token ? Home : Login}/>
      <Route exact path="/:page" Component={ PageRender } />
      <Route exact path="/:page/:id" Component={ <PageRender/> } />      
      </Routes>
      </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
