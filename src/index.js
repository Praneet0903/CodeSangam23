import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Topbar from './components/Topbar';
import Main from './components/Main';
import Loging from './components/Loging';
import Sign from './components/Sign';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from './components/Todos';
import NoteState from './context/notes/NoteState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <NoteState>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/login" element={<Main/>} /> */}
          <Route path="/login" element={<Loging />} />
          <Route path="/signUp" element={<Sign />} />
          <Route path="/task" element={<Todos />} />
        </Routes>
      </Router>
    </NoteState>
  </>
);

reportWebVitals();
