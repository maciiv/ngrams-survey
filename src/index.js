import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SurveyComplete from './pages/SurveyComplete';
import Tutorial from './pages/Tutorial';
import Survey from './pages/Survey';
import SurveyError from './pages/SurveyError';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="survey-complete" element={<SurveyComplete />} />
        <Route path="tutorial" element={<Tutorial />} />
        <Route path="survey" element={<Survey isTutorial={false} />} />
        <Route path="survey-error" element={<SurveyError />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
