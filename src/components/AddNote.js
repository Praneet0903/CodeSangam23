import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
  });
  // const [file, setFile] = useState("");

  // const handleImage = ()=>{
  //   console.log(file);
  // };

  
  
 
  const inputEvent = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const onAdd = (event) => {
    event.preventDefault();
    console.log(note);
    handleClose();
    addNote(note.title, note.description, note.tag, note.date);
    
  };

  return (
    <>
      <div className="pb-2">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row align-items-center">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Add title"
                id="title"
                name="title"
                onChange={inputEvent}
              />

              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShow}
                >
                  Add
                </button>
              </div>

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
                      onChange={inputEvent}
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
                      onChange={inputEvent}
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
                      onChange={inputEvent}
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
                  <Button variant="primary" onClick={onAdd}>
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default AddNote;
