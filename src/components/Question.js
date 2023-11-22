import { useState,useEffect,useCallback } from "react";
import { useNavigate } from "react-router";
import "./Question.css";
import { useAuth } from "../Auth/UseAuth";
import axios from "axios";
const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  quizName,
  timeRemaining,
  displayTime
}) => {
  const [selected, setSelected] = useState();
  const {token}=useAuth();
  const navigate = useNavigate();

  const handleSelect = (i) => {
    // console.log(selected)
    // console.log(correct)
    if (selected === i && selected === options[correct]) return "select";
    else if (selected === i && selected !== options[correct]) return "wrong";
    else if (i === options[correct]) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === options[correct]) setScore(score + 1);
  };

  const submitQuiz= useCallback(async () => {
    const url = 'https://quizx-backend.onrender.com/exam';
    const quizData = {
        score: score,
        quizName: quizName,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set appropriate content type
    };

    try {
        const response = await axios.post(url, quizData, { headers });
        navigate(`/result/${response.data.data.ReportId}`);
    } catch (error) {
        console.error('Error:', error);
    }
  }, [score, quizName, token, navigate]);



  useEffect(() => {
    if (timeRemaining === 0) {
      // Timer is up, submit the quiz
      submitQuiz();
    }
  }, [timeRemaining,submitQuiz]);

  const handleNext =async () => {
    // console.log(currQues);
    // console.log(questions.length);
    
    if (currQues+1 >= questions.length) {
     submitQuiz();
      
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    }
  };

  const handleQuit = () => {
    navigate('/')
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>
      <div>
  <p>Time Remaining: {displayTime}</p>
</div>
      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <button
            className="btn btn-outline-primary mr-2 mb-2 "
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </button>
          <button
           className="btn btn-outline-primary mr-2 mb-2 "
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;