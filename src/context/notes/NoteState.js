import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all node
  const getNote = async () => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };




  //add a note
  const addNote = async (title, description, tag, dueDate,drawingData ) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag , dueDate,drawingData}),
    });

    const note = {
      _id: "6551e83005d1c331dafff81a",
      user: "6551cc7bfdf65d4e77f2ee20",
      title: title,
      description: description,
      tag: tag,
      date: "2023-11-14T06:24:11.578+00:00",
      dueDate: dueDate,
      drawingData:drawingData,
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // // add a image
  // const addImage = async (image, _id) => {
  //   let formdata = new FormData();
  //   formdata.append("image", image);
  //   return privateAxios
  // };



  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const json2 = await response.json();
    console.log(json2);

    console.log("Deleting Note with id: " + id);
    const NewNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(NewNotes);
  };



  // update a note
  const updateNote = async (id, title, description, tag ,dueDate,drawingData) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag, dueDate,drawingData }),
    });
    // const json = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].dueDate = dueDate;
        newNotes[index].drawingData = drawingData;
        break;
      }
    }
    setNotes(newNotes)
  };

   // update a note
   const updateCompleted = async (id, done) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/updatedone/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({done }),
    });
    // const json = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].done = done;
        break;
      }
    }
    setNotes(newNotes)
  };



  // const deleteAll = async (id) => {
  //   const response = await fetch(`${host}/api/notes/deleteAll/`, {
  //     method: "DELETE",
  //     headers:{
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify({id}),
  //   });

  //   console.log("Deleting Note with id: " + id);

  // };


  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNote, updateCompleted,setNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
