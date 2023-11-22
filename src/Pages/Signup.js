import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const [firstname,setfName]=useState('');
    const [lastname,setlName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cnfpassword,setCnfPassword]=useState('');
    const navigate = useNavigate();
    const handlecnfPassword=(e)=>{
      setCnfPassword(e);
      if(e===password){
        console.log(e);
        document.getElementById('passwordError').classList.add('hidden');
      }
      else if(e===null){
        document.getElementById('passwordError').classList.add('hidden');
      }
      else{
        document.getElementById('passwordError').classList.remove('hidden');
      }
    }
    const handleRegSubmit =(e)=>{
        e.preventDefault();
        if(cnfpassword===password){
          axios.post('https://quizx-backend.onrender.com/auth/register',{firstname,lastname,email,password})
          .then(result=>{
            document.getElementById('emailError').classList.add('hidden');
            // console.log(result);
          navigate('/login');
          })
          .catch(err=>{
            if(err.response?.data?.message==="User Already Registered"){
              document.getElementById('emailError').classList.remove('hidden');
            }
            else{
            }
          })}
          else{
        }
        }

  return (
    <div className="container my-4">
      <h2 className="text-center"> User Sign Up</h2>

      <form id="registrationForm" onSubmit={handleRegSubmit}>
        
      <div className="mb-3">
          <label htmlFor="fname" className="form-label"> First Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="firstname"
            required
            onChange={(e)=>setfName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="lastname"
            required
            onChange={(e)=>setlName(e.target.value)}
          />  
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <span className="error hidden text-danger" id="emailError">Email Already Registered</span>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          
        </div>

        <div className="mb-3">
          <label htmlFor="confrim-pass" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm-pass"
            placeholder="Confrim Password"
            required
            onChange={(e)=>handlecnfPassword(e.target.value)}
          />
          <span className="error hidden" id="passwordError">PassWords do not match</span>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-100 btn-lg" id="submitBtn">
            Sign Up
          </button>
        </div>
        </form>
        <p>Already have an account</p>
        <Link to="/login" className="btn btn-danger border w-100">
            Login
        </Link>
    </div>
  )
}
