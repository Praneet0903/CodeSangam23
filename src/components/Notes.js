import React, { useState, useContext, useEffect, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import NoteContext from "../context/notes/NoteContext";

import "./Notes.css";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import ImageComponent from './ImageComponent';

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  let { notes, getNote, setNotes } = context;
  const { deleteNote, updateNote, updateCompleted } = context;

  const sketchRef = useRef();


  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
  }, []);


  const [curnote, setCurNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    edueDate: "",
    edrawingData: ""
  });

  const sortByDeadline = async () => {
    const sortedList = [...notes];
    sortedList.sort((a, b) => {
      const deadlineA = new Date(a.date);
      const deadlineB = new Date(b.date);

      // Compare deadlines
      if (deadlineA < deadlineB) {
        return -1;
      }
      if (deadlineA > deadlineB) {
        return 1;
      }
      return 0;
    });
    setNotes(sortedList);
    console.log(notes);
  }
  const sortByDeadlineRev = async () => {
    const sortedList = [...notes];
    sortedList.sort((a, b) => {
      const deadlineB = new Date(a.date);
      const deadlineA = new Date(b.date);

      // Compare deadlines
      if (deadlineA < deadlineB) {
        return -1;
      }
      if (deadlineA > deadlineB) {
        return 1;
      }
      return 0;
    });
    setNotes(sortedList);
    console.log(notes);
  }

  // const handleSortInc=()=>{
  //   console.log("handleSortINC")
  //   setNotes(notes.slice().sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);
  //     return dateA - dateB;
  //   }))
  // }
  const handleName = () => {
    console.log(notes);
    setNotes(notes.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    }))
  }


  const [show, setShow] = useState(false);
  const [showContent, setContent] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleContentShow = (currentNote) => {
    console.log(currentNote)
    setContent(true);
    setCurNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      edueDate: currentNote.dueDate,
      edrawingData: currentNote.drawingData
    });
    console.log(curnote.edrawingData);
  }
  const handleContentClose = () => setContent(false);

  const inputEvent = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setCurNote({ ...curnote, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    const edrawingData = await sketchRef.current.exportImage("png");
    setCurNote({ ...curnote, edrawingData: edrawingData })
  };

  const upNote = async (currentNote) => {
    handleShow();
    // console.log(currentNote);
    setCurNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      edueDate: currentNote.dueDate,
      edrawingData: currentNote.edrawingData
    });
    console.log(curnote.edrawingData);
  };

  const onUpdate = async (event) => {
    event.preventDefault();

    console.log(curnote);
    updateNote(
      curnote.id,
      curnote.etitle,
      curnote.edescription,
      curnote.etag,
      curnote.edueDate,
      curnote.edrawingData
    );
    handleClose();
  };

  const updateDone = (currentNote) => {
    updateCompleted(currentNote._id, !currentNote.done);
  };


  useEffect(() => {
    const arrayIdsOrder = JSON.parse(localStorage.getItem("taskOrder"));

    if (!arrayIdsOrder && notes?.length) {
      const idsOrderArray = notes.map((task) => task._id);
      localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));
    }

    let myArray;
    if (arrayIdsOrder?.length && notes?.length) {
      myArray = arrayIdsOrder.map((pos) => {
        return notes.find((el) => el._id === pos);
      });

      const newItems = notes.filter((el) => {
        return !arrayIdsOrder.includes(el._id);
      });

      if (newItems?.length) myArray = [...newItems, ...myArray];
    }

    notes = myArray || notes;
  }, [notes]);

  const handleOnDragEnd = (result) => {
    if (!result?.destination) return;

    const tasks = [...notes];

    const [reorderedItem] = tasks.splice(result.source.index, 1);

    tasks.splice(result.destination.index, 0, reorderedItem);

    const idsOrderArray = tasks.map((task) => task._id);
    localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));

    notes = tasks;
    console.log(notes);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card" id="list1" style={{ "border-radius": ".75rem", "backgroundColor": "#eff1f2" }}>
                <div className="card-body py-4 px-4 px-md-5">

                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <i className="fas fa-check-square me-1"></i>
                    <u>My Todo-s</u>
                  </p>

                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select
                      className="select"
                      name="select1"
                      onChange={(e) => {
                        // Do not use onChange method, for your use case
                        console.log("event value", e.target.value);
                        console.log("event name", e.target.name);
                      }}
                      onClick={(e) => {
                        if (e.target.value == 'A') { sortByDeadline(); }
                        else if (e.target.value == 'B') { sortByDeadlineRev(); }
                        console.log("XX event value", e.target.value);
                        console.log("XX event name", e.target.name);
                      }}
                    >
                      <option value="A">Default</option>
                      <option value="B">Added Dates</option>
                      <option value="C">Deadline</option>
                    </select>
                    <a href="#!" style={{ "color": "#23af89" }} data-mdb-toggle="tooltip" title="Ascending"><i
                      className="fas fa-sort-amount-down-alt ms-2"></i></a>
                  </div>
                  <AddNote />
                  <div className="container">
                    <h2>Your Notes..</h2>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="todos">
                        {(provided) => (
                          <section {...provided.droppableProps} ref={provided.innerRef}>
                            {notes.map((note, index) => {
                              return (
                                <Draggable
                                  key={note._id}
                                  draggableId={note._id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-group list-group-horizontal rounded-0 bg-transparent"
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <div className="box">
                                        <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input me-0"
                                              type="checkbox"
                                              value={note.done}
                                              id="done"
                                              name="done"
                                              checked={note.done}
                                              onChange={() => updateDone(note)}
                                            />
                                          </div>
                                          <div className="content_box">
                                            <p>
                                              <button type="button"
                                                data-mdb-toggle="tooltip"
                                                className="bttn"
                                                onClick={() => { handleContentShow(note) }}>
                                                <h2
                                                  className={
                                                    note.done
                                                      ? "lead fw-normal mb-0 line_through"
                                                      : "lead fw-normal mb-0"
                                                  }
                                                >
                                                  {note.title}
                                                </h2>
                                              </button>
                                            </p>
                                            {/* <p className="small mb-0">
                                  <i className="fas fa-info-circle me-2"></i>
                                  {note.dueDate}
                                </p> */}

                                            <Modal show={showContent} onHide={handleContentClose}>
                                              <Modal.Header closeButton>
                                                <Modal.Title>{curnote.etitle}</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                <p>
                                                  Description:
                                                  <h2 className="lead fw-normal mb-0">
                                                    {curnote.edescription}
                                                  </h2>
                                                </p>
                                                <p >
                                                  tag:
                                                  <h2 className="lead fw-normal mb-0">
                                                    {curnote.etag}
                                                  </h2>
                                                </p>
                                                <p >
                                                  url:
                                                  <h2 className="lead fw-normal mb-0">
                                                    {<ImageComponent base64URL={curnote.edrawingData}/>}
                                                  </h2>
                                                </p>
                                                
                                              </Modal.Body>

                                              <Modal.Footer>
                                                <Button
                                                  variant="secondary"
                                                  onClick={handleContentClose}
                                                >
                                                  Close
                                                </Button>
                                              </Modal.Footer>
                                            </Modal>
                                          </div>
                                        </li>
                                      </div>

                                      <div className="d-flex flex-row justify-content-end mb-1">
                                        <button
                                          type="button"
                                          className="bttn"
                                          data-mdb-toggle="tooltip"
                                          title="Edit todo"
                                          onClick={() => {
                                            upNote(note);
                                          }}
                                        >
                                          <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <Modal show={show} onHide={handleClose}>
                                          <Modal.Header closeButton>
                                            <Modal.Title>Update Task</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            <div className="form-outline mb-4">
                                              <label
                                                className="form-label"
                                                htmlFor="description"
                                              >
                                                Title
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="etitle"
                                                name="etitle"
                                                value={curnote.etitle}
                                                onChange={inputEvent}
                                              />
                                            </div>

                                            <div className="form-outline mb-4">
                                              <label
                                                className="form-label"
                                                htmlFor="description"
                                              >
                                                Description
                                              </label>
                                              <textarea
                                                id="edescription"
                                                className="form-control form-control-lg"
                                                name="edescription"
                                                value={curnote.edescription}
                                                onChange={inputEvent}
                                              />
                                            </div>

                                            <div className="form-outline mb-4">
                                              <label className="form-label" htmlFor="tag">
                                                Tag
                                              </label>
                                              <input
                                                type="text"
                                                id="etag"
                                                className="form-control form-control-lg"
                                                name="etag"
                                                value={curnote.etag}
                                                onChange={inputEvent}
                                              />
                                            </div>

                                            <div className="form-outline mb-4">
                                              <label
                                                className="form-label"
                                                htmlFor="date"
                                              >
                                                Due Date
                                              </label>
                                              <input
                                                type="date"
                                                id="edate"
                                                className="form-control form-control-lg"
                                                name="edate"
                                                value={curnote.edueDate}
                                                onChange={inputEvent}
                                              />
                                            </div>
                                            <div>
                                              <ReactSketchCanvas ref={sketchRef} />
                                              <button onClick={handleSave}>Save Drawing</button>
                                              <button onClick={() => { sketchRef.current.clearCanvas() }}>Clear Canvas</button>
                                            </div>
                                          </Modal.Body>

                                          <Modal.Footer>
                                            <Button
                                              variant="secondary"
                                              onClick={handleClose}
                                            >
                                              Close
                                            </Button>
                                            <Button variant="primary" onClick={onUpdate}>
                                              Update
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>

                                        <a
                                          href=""
                                          className="text-danger d-flex delet"
                                          data-mdb-toggle="tooltip"
                                          title="Delete todo"
                                        >
                                          <i
                                            className="fas fa-trash-alt"
                                            onClick={() => { deleteNote(note._id) }}
                                          ></i>
                                        </a>
                                      </div>
                                    </ul>


                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </section>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notes;
