import React, { useState,useEffect } from 'react'
import { useAuth } from '../Auth/UseAuth';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';


export default function GetQuiz() {
    const [user,setUser]=useState();
    const {token}=useAuth();
    const {category}=useParams();

    useEffect(()=>{
        const url=!category ?`https://quizx-backend.onrender.com/quiz`:`https://quizx-backend.onrender.com/quiz/${category}`;
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
            console.log(data.data);
            setUser(data.data);
          })
          .catch((error) => {
            console.log("There is some error");
            console.error(error);
          });
        },[category,token])
  return (
    <div>
      {user?.length>0 ?<div>
      <h1 style={{textAlign: "center"}}>Quiz</h1>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>QuizName</th>
            <th>Category</th>
            <th>Take Quiz</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.category}</td>
              <td><Link className='btn btn-success' to={`/exam/${user.name}`}>Start</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>:<div>No results Found</div>}
    </div>
  )
}
