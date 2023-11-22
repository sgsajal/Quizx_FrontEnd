import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/UseAuth';

export default function Login() {
  const { setToken,setuserid,setusername} = useAuth();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();




    const handleLoginSubmit =(e)=>{
        e.preventDefault();
        axios.post('https://quizx-backend.onrender.com/auth/login',{email,password})
        .then(result=>{console.log(result);
          if(result.status===200){
            document.getElementById('passwordError').classList.add('hidden');
            document.getElementById('emailError').classList.add('hidden');
            const token = result.data.data.token;
            const userid = result.data.data.userid;
            const username=result.data.data.username;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userid', userid);
            localStorage.setItem('username', username);
            setToken(token);
            setuserid(userid);
            setusername(username);
            navigate('/');
          }
        })
        .catch(err=>{console.log(err);
          if(err.response?.data?.message==="Incorrect Password"){
            document.getElementById('passwordError').classList.remove('hidden');
            document.getElementById('emailError').classList.add('hidden');
          }
          else if(err.response?.data?.message==="No user exist"){
            document.getElementById('emailError').classList.remove('hidden');
            document.getElementById('passwordError').classList.add('hidden');
          }
        })
    }
  return (
    <div className="container">
      <h2 className="text-center">Login</h2>

      <form id="registrationForm" onSubmit={handleLoginSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <span className="error hidden" id="emailError">Email Not Registered</span>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <span className="error hidden" id="passwordError">Password is Incorrect</span>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-100 btn-lg" id="submitBtn">
            Login
          </button>
        </div>
      </form>
      <p>Want to Createa New Account</p>
        <Link to="/signup" className="btn btn-danger border w-100">
            Sign Up
        </Link>
    </div>
  )
}
