import { useEffect, useState } from "react";
import "./Result.css";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Auth/UseAuth";
import axios from "axios";

const Result = () => {
    const { token } = useAuth();
    const [score,setScore]=useState(0);
    const [total,setTotal]=useState(0);
    const [uname,setuname]=useState(0);
    const [quizNam,serQuizNam]=useState(0);
    const {reportId}=useParams();
    


    useEffect(()=>{
      const url = `https://quizx-backend.onrender.com/report/${reportId}`; // Replace with your API endpoint
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
          console.log(data.data);
          setScore(data.data.score);
          setTotal(data.data.total);
          setuname(data.data.userName);
          serQuizNam(data.data.quizName);
          console.log(data);
        })
        .catch((error) => {
          // Handle errors, such as network issues or unauthorized access
          console.error(error);
        });
      },[reportId,token])

  return (
    <div className="result">
      <span className="title"> {uname}</span>
      <span className="title">Quiz Name : {quizNam}</span>
      <span className="title">Final Score : {score} out of {total}</span>
      <button
        className="btn btn-outline-primary mr-2 mb-2 "
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        <Link to="/">
        Go to homepage</Link>
      </button>
    </div>
  );
};

export default Result;