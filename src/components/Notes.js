import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import "./Notes.css";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { AnimatePresence } from "framer-motion";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  let { notes, getNote } = context;
  const { deleteNote, updateNote, updateCompleted } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    }
    
    
  }, []);

    
  const [curnote, setCurNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    edueDate: "",
  });


  const [show, setShow] = useState(false);
  const [showContent, setContent] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleContentShow = (currentNote) => 
  {
    
    setContent(true);
    setCurNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      edueDate: currentNote.dueDate,
    });
  }
  const handleContentClose = () => setContent(false);

  const inputEvent = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setCurNote({ ...curnote, [event.target.name]: event.target.value });
  };

  const upNote = (currentNote) => {
    handleShow();
    console.log(currentNote);
    setCurNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      edueDate: currentNote.dueDate,
    });
    // console.log(curnote);
  };

  const onUpdate = (event) => {
    event.preventDefault();
    console.log(curnote);
    updateNote(
      curnote.id,
      curnote.etitle,
      curnote.edescription,
      curnote.etag,
      curnote.edueDate
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
      <AnimatePresence mode="wait">
      <AddNote />
      </AnimatePresence>
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
                          id="align"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="box" >
                            <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent ">
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
                                  onClick={()=>{handleContentShow(note)}}>
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
                          
                          <div>
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
                              <i className="fas fa-pencil-alt me-3"></i>
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
                                  <div className="form-outline mb-4">
                                    <label
                                      className="form-label"
                                      htmlFor="description"
                                    >
                                      Add image
                                    </label>
                                    <br />
                                    <input
                                      type="file"
                                      id="eimage"
                                      name="eimage"
                                    />
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
                                  onClick={() => deleteNote(note._id)}
                                ></i>
                              </a>
                              </div>
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
    </>
  );
};

export default Notes;
