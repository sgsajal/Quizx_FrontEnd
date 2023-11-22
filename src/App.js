import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { ProtectedRoute } from "./Auth/ProtectedRoute";

/** import components */
import Quiz from "./components/Quiz";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import YourQuizzes from "./Pages/YourQuizzes";
import Home from "./Pages/Home";
import CreateQuiz from "./Pages/CreateQuiz";
import GetQuiz from "./components/GetQuiz";

function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route path="/exam/:quizName" element={<ProtectedRoute>
              <Quiz/>
            </ProtectedRoute>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createquiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <GetQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:category"
          element={
            <ProtectedRoute>
              <GetQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result/:reportId"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/yourquiz"
          element={
            <ProtectedRoute>
              <YourQuizzes />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
