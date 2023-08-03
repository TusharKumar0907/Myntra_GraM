import React from 'react';
import { generatePath, useParams } from 'react-router-dom';

import NotFound from '../components/NotFound';

import { useSelector } from 'react-redux';


const generatePage = (pageName) => {

    const component = () => require(`../pages/${pageName}`).default;
    try{
        return React.createElement(component());
    } catch (err) {
        return React.createElement(NotFound);
    }
}


const PageRender = () => {
    
    const { page , id} = useParams();
    const { auth } = useSelector(state => state);

    console.log(id);
    console.log(page);

    let pageName = "";

    if(auth.token) {
    
    if(id) {
        pageName = `${page}/[id]`;
    } else {
        pageName = `${page}`;
    }
    
    }

    return generatePage(pageName);
}


export default PageRender;