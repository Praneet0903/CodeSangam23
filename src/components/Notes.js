import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import "./Notes.css";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNote } = context;
  const { deleteNote, updateNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
  }, []);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
  });

  return (
    <>
      <AddNote />
      <div className="container">
        <h2>Your Notes..</h2>
        {notes.map((note) => {
          return (
            <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
              <div className="box">
                {/* <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                          <div className="form-check">
                            <input className="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked1"
                              aria-label="..." checked />
                          </div>
                        </li> */}

                <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <h2 className="lead fw-normal mb-0">{note.title}</h2>
                </li>
                <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <h2 className="lead fw-normal mb-0">{note.description}</h2>
                </li>
                <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <h2 className="lead fw-normal mb-0">{note.tag}</h2>
                </li>
              </div>

              <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row justify-content-end mb-1">
                  <button
                  type="button" className="text-info"
                  data-mdb-toggle="tooltip"
                  title="Edit todo"
                  onClick={handleShow}
                >
                <i className="fas fa-pencil-alt me-3" onClick={() => updateNote(note._id)}></i>
                </button>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Tittle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control form-control-lg"
                      name="description"
                      
                    />
                  </div>
                  

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="tag">
                      Tag
                    </label>
                    <input
                      type="text"
                      id="tag"
                      className="form-control form-control-lg"
                      name="tag"
                      
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="date">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="form-control form-control-lg"
                      name="date"
                      
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="description">
                      Add image
                    </label>
                    <br />
                    <input type="file" id="image"
                      name="image" />
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" >
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>
                  <a
                    href="#!"
                    className="text-danger"
                    data-mdb-toggle="tooltip"
                    title="Delete todo"
                  >
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => deleteNote(note._id)}
                    ></i>
                  </a>
                </div>
                <div className="text-end text-muted">
                  <a
                    className="text-muted"
                    data-mdb-toggle="tooltip"
                    title="Due date"
                  >
                    <p className="small mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      {note.dueDate}
                    </p>
                  </a>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
