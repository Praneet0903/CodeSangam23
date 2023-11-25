import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { NoteItem } from '../components/NoteItem';
import Notes from "./Notes";
import './Todos.css';

const Todos = (props) => {
  const host = "http://localhost:5000";

  const [deadlines,setDeadlines] = useState([]);
  const [ notes,setNotes] = useState([]);
  

  function showNotification(title, options) {
    if (Notification.permission === "granted") {
        new Notification(title, options);
    }
}

function calculateTimeDifference(deadline) {
    const currentTime = new Date();
    const timeDifference = deadline - currentTime;
    return timeDifference;
}

const getDeadline = async () => {
  const response = await fetch(`${host}/api/notes/fetchdeadline`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token'),
    },
  });
  const json = await response.json();
  // console.log(json); 
  setDeadlines(json);
};

const fetchAndNotify = async () => {
  await getDeadline();
  console.log("fetch & notify");
  console.log(deadlines);
  for (let index = 0; index < deadlines.length; index++) {
    const deadline = deadlines[index].dead;
    // console.log(deadline);
    if(deadline==null){
      continue;
    }
    console.log(deadline);
    const curr = new Date().toISOString();
    console.log(curr);
    const timeDifference = calculateTimeDifference(deadline);
    console.log(timeDifference);

    const threshold = 24 * 60 * 60 * 1000;

    if ((timeDifference > 0 && timeDifference <= threshold)) {
      console.log("Hola");
        setTimeout(() => {
            showNotification("Deadline approaching!", { body: "Your deadline is coming up soon." });
        }, timeDifference);
    }
  }
};

  useEffect( () => {
    fetchAndNotify();
}, []);


  
  return (  
  <Notes showAlert={props.showAlert} />
  );
}

export default Todos;