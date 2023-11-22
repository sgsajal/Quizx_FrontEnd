import React, { useEffect, useState } from "react";
import Question from "./Question";
import axios from "axios";
import { useAuth } from "../Auth/UseAuth";
import { useParams } from 'react-router-dom';

const Quiz=()=> {
  const {quizName} = useParams();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [displayTime, setDisplayTime] = useState("10:00");
  const {token } = useAuth();
  
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set appropriate content type
    };
    // console.log(quizName);
    // console.log(token);
    axios.get(`https://quizx-backend.onrender.com/exam/${quizName}`,{headers})
      .then((response) => {
        // console.log(response.data);
        const fetchedQuestions = response.data.data.questionList;
       
        setQuestions(fetchedQuestions);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, [quizName,token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    setDisplayTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
  }, [timeRemaining]);

  // Check if questions have loaded
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentIndex];
  // console.log(currentQuestion);
  const {  options, answer } = currentQuestion;


  return (
    <div className="container">
      <h1 className="mt-5">Quiz</h1>
      <div className="mb-5">
        <p>Total questions: {questions.length}</p>
        <p>Correct answers: {correctAnswers}</p>
      </div>
      <Question
      quizName={quizName}
        questions={questions}
        options={options}
        currQues={currentIndex}
        setCurrQues={setCurrentIndex}
        setScore={setCorrectAnswers}
        score={correctAnswers}
        setQuestions={setQuestions}
        correct={answer-1}
        displayTime={displayTime}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

export default Quiz;
