import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home.js';
import Login from './pages/login.js';
import PageRender from './pagerender.js';

import { useSelector, useDispatch } from 'react-redux';

function App() {

  return (
    <BrowserRouter>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
      <Routes>
      <Route path="/" Component={Login }/>
      <Route path="/:page" Component={PageRender} />
      <Route path="/:page/:id" Component={PageRender} />
      </Routes>
      </div>
      </div>
  </BrowserRouter>

  );
}

export default App;
