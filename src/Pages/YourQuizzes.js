import React, { useState,useEffect } from 'react'
import { useAuth } from '../Auth/UseAuth';
import axios from 'axios';

export default function YourQuizzes() {
    const [user,setUser]=useState();
    const {userid,token}=useAuth();
    const [val,setval]=useState(false);

    useEffect(()=>{
        const url = `https://quizx-backend.onrender.com/report/user/${userid}`; // Replace with your API endpoint
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
            setUser(data.data);
            console.log(data);
          })
          .catch((error) => {
            // Handle errors, such as network issues or unauthorized access
            console.error(error);

          });
        },[token,userid,val])


        const handleDelete = async ({id}) => {
          try {
            // Assume you have the token stored in your state or context
            const authToken = token;
      
            // Replace 'your_backend_url' with the actual URL of your backend endpoint
            const apiUrl = 'https://quizx-backend.onrender.com/report/'+id;
      
            const response = await axios.delete(apiUrl, {
              headers: {
                Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
              },
            });
      
            console.log(response.data); 
            alert("Report Deleted Succussfully");
            setval(val=>!val);
          } catch (error) {
            console.error(error);
      
          }
        };


  return (
    <div>
      {user ?<div>
      <h1 style={{textAlign: "center"}}>Your Results</h1>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>QuizName</th>
            <th>Score</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.quizName}</td>
              <td>{user.score}</td>
              <td>{user.total}</td>
              <td><button className='btn btn-danger' onClick={()=>handleDelete({id:user._id})}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>:<div>No results Found</div>}
    </div>
  )
}
