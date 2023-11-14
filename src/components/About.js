import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';


export const About = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, addNote, editNote,setNotes } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate('/login');
    }

  }, [])

  const handleSortDec=()=>{
    
      setNotes(notes.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      }))
    }
  const handleSortInc=()=>{
    
      setNotes(notes.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      }))
    }

  const handleName=()=>{
    console.log(notes);
    setNotes(notes.slice().sort((a,b)=>{
      return a.title.localeCompare(b.title);
    }))
  }
  
  function notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }
  
    

  return (
    <div>
      <div className="row my-2">
        <button className="btn btn-primary" onClick={handleSortDec}>Click me!!</button>
        <button className="btn btn-primary" onClick={handleSortInc}>Click me!!</button>
        <button className="btn btn-primary" onClick={handleName}>Click me!!</button>
        <h2 className='my-2'>Your notes</h2>
        {notes.map((note) => { return <NoteItem key={note._id}  note={note} showAlert={props.showAlert} /> }
        )}
      </div>
        <button className="btn btn-primary" onClick={notifyMe}>Notify Me!!</button>
    </div>
  );
}