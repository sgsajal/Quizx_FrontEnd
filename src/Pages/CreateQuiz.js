import React, { useState } from 'react';
import { useAuth } from '../Auth/UseAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const {token}=useAuth();
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('');
  const [category, setCategory] = useState('General'); // Default category
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '',''], answer: 1 }]);



  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '',''], answer: 1}]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleanswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set appropriate content type
    };


    axios.post('https://quizx-backend.onrender.com/quiz', {category,name:quizName,questionList:questions},{headers})
  .then(response => {
    console.log(response.data);
    navigate('/')
  })
  .catch(error => {
    if(error.response.data.message==="Quiz Name already Registered"){
      document.getElementById('qNameError').classList.remove('hidden');
    }
    // console.error('Error creating quiz:', error);
  });
    console.log({ quizName, category, questions });
  };

  return (
    <div className="container my-3 ">
            <h2 className="text-center">Create A new Quiz</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="quizName">Quiz Name</label>
        <input
          type="text"
          className="form-control"
          id="quizName"
          placeholder="Enter Quiz Name"
          value={quizName}
          required
          onChange={(e) => setQuizName(e.target.value)}
        />
        <span className='error hidden' id="qNameError">Quiz Name should be Unique . Try a different Name</span>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Math">Math</option>
          <option value="Programming">Programming</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      {questions.map((question, index) => (
            <div key={index}>
            <div className="container my-3 border border-dark">
        
          <div className="form-group">
            <label htmlFor={`question-${index}`}>Question {index + 1}</label>
            <input
              type="text"
              className="form-control"
              id={`question-${index}`}
              placeholder="Enter Question"
              value={question.question}
              required
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            />
          </div>

          <div className="form-row">
            {question.options.map((option, optionIndex) => (
              <div className="col" key={optionIndex}>
                <div className="form-group">
                  <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`option-${index}-${optionIndex}`}
                    placeholder={`Enter Option ${optionIndex + 1}`}
                    value={option}
                    required
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor={`answer-${index}`}>Correct Answer</label>
            <select
              className="form-control"
              id={`answer-${index}`}
              value={question.answer}
              onChange={(e) => handleanswerChange(index, e.target.value)}
            >
              <option value={1}>Option 1</option>
              <option value={2}>Option 2</option>
              <option value={3}>Option 3</option>
              <option value={4}>Option 4</option>
            </select>
          </div>
        </div>
        </div>
      ))}

      <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
        Add Question
      </button>

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
    </div>
  );
};

export default CreateQuiz;
