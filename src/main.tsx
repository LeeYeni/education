import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import QuizCreatePage from "./pages/quiz/create/page";
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/create" element={<QuizCreatePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)