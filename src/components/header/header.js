import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu.js';
import Search from './search.js';


const Header = () => {
  
  return (
  
  <div className="header bg-light">
   
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
       <Link to="/">
        <h1 className="navbar-brand text-uppercase p-0 m-0">Network</h1>
       </Link>

    <Search />
    
    <Menu />

  </nav>

  </div>

)

}

export default Header;