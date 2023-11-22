import React,{useEffect,useState} from 'react';
import { useAuth } from '../Auth/UseAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';


function MyComponent() {
  const{setToken,setuserid,token,userid,username,setusername}=useAuth();
  const [firstname,setfName]=useState('');
  const [lastname,setlName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  //Send Req for User Info
  useEffect(()=>{
  const url = `https://quizx-backend.onrender.com/user/${userid}`; // Replace with your API endpoint
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // Set appropriate content type
  };
  
  // Make the HTTP request with Axios
  axios.get(url, { headers })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Request failed');
      }
    })
    .then((data) => {
      // Process the response data
      console.log(data.data.email);
      setEmail(data.data.email);
      setfName(data.data.firstname);
      setPassword(data.data.password);
      setlName(data.data.lastname);
      console.log(data);
    })
    .catch((error) => {
      // Handle errors, such as network issues or unauthorized access
      console.error(error);
    });
  },[token,userid])

  const handleLogout = () => {
    // Remove the token from localStorage
    console.log("removed");
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    setToken(null);
    setuserid(null);
    setusername(null); 
    console.log(username);// Replace 'jwtToken' with your to
  };


  const handleUpdateSubmit =async(e)=>{
    e.preventDefault();
    try {const url = 'https://quizx-backend.onrender.com/user'; // Replace with your API URL
    const data = {
      firstname,lastname,email,password
    };


    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set appropriate content type
    };
   const response = await axios.put(url, data, {
        headers: headers,
      });
      setusername(firstname)
      console.log('PUT request successful:', response.data);
    } catch (error) {
      console.error('PUT request error:', error);
      // Handle errors
    }
    }


  return (
    <div className="container my-4">
      <h2 className="text-center"> User Profile page</h2>

      <form id="registrationForm" onSubmit={handleUpdateSubmit}>
        
      <div className="mb-3">
          <label htmlFor="firstname" className="form-label"> First Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="firstname"
            onChange={(e)=>setfName(e.target.value)}
            value={firstname}
          />
          {!firstname &&
          <span className="error" id="firstnError">First name should be there</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="lastname"
            onChange={(e)=>setlName(e.target.value)}
            value={lastname}
          />          {!lastname &&
            <span className="error" id="lastnerror">Last name should be there</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-100 btn-lg" id="submitBtn">
            Update User Information
          </button>
        </div>
        </form>
        <Link className='btn btn-danger w-100 btn-lg my-5' to={'/login'}onClick={handleLogout}>Logout</Link>
        </div>
  );
}

export default MyComponent;
