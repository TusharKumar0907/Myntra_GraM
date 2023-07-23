import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../redux/actions/authAction.js';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
    
    const initialState = {email: '', password: ''};
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const dispatch = useDispatch();

    const history = useNavigate();
    const { auth } = useSelector(state => state);
    useEffect(() => {
        if(auth.token) history("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userData);
        dispatch(login(userData));
    }





    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className='text-uppercase text-center mb-2'> Network </h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email'
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={ email } autoComplete="off"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={ password } name='password' autoComplete="off" />
                </div>
                <button type="submit" className="btn btn-dark" disabled={email && password ? false : true}>Login</button>
                <p className="my-2">
                    You dont have an account? <Link to="/register" style={{color: "RED"}}>Register Now</Link>
                </p>
                </form>        
        </div>
    )
}


export default Login