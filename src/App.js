import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Topbar from './components/Topbar';
import Main from './components/Main';
import Loging from './components/Loging';
import Sign from './components/Sign';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from './components/Todos';
import NoteState from './context/notes/NoteState';
import Alert  from './components/Alert';
import ImageComponent from './components/ImageComponent';


function App() {

  useEffect(() => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}, []);
  
	const [alert, setAlert] = useState(null);

	const showAlert = (message, type)=>{
		setAlert({
		  msg: message,
		  type: type
		})
		setTimeout(() => {
			setAlert(null);
		}, 1500);
	}
  const base64URL = "data:image/png;base64,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"
	return (
		<>
    <NoteState>
      <Router>
        <Topbar />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/login" element={<Main/>} /> */}
          <Route path="/login" element={<Loging showAlert={showAlert}/>} />
          <Route path="/signUp" element={<Sign showAlert={showAlert}/>} />
          <Route path="/task" element={<Todos showAlert={showAlert}/>} />
          {/* <Route path="/draw" element={<ImageComponent base64URL={base64URL}/>} /> */}
        </Routes>
      </Router>
    </NoteState>
  </>
	);
}

export default App;