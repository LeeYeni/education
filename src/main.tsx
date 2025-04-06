import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import QuizShare from "./pages/quiz/QuizShare";
import QuizRoom from "./pages/quiz/room/QuizRoom";
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/share/:roomCode" element={<QuizShare />} />
        <Route path="/quiz/room/:roomCode" element={<QuizRoom />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)