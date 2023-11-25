import React, { useState, useContext, useRef } from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const sketchRef = useRef();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
    drawingData:""
  });
  const [file, setFile] = useState(null);

  const inputEvent = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSave = ()=>{
    console.log("handleSave")
  }

  const onAdd = async (event) => {
    event.preventDefault();
    console.log(note);
    // console.log(file);
    const drawingData = await sketchRef.current.exportImage("png");
    handleClose();
    addNote(note.title, note.description, note.tag, note.date,drawingData);
    //addImage(file, note._id);
  };

  return (
    <>
      <div className="pb-2">
        <div className="card">
          <div className="card-body" >
            <div className="d-flex flex-row align-items-center">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Add Note "
                id="title"
                name="title"
                onClick={handleShow}
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
                  <Modal.Title>Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="form-control form-control-lg"
                      name="title"
                      onChange={inputEvent}
                    />
                  </div>
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
                  <div>
                    <ReactSketchCanvas ref={sketchRef} />
                    <button onClick={handleSave}>Save Drawing</button>
                    <button onClick={() => { sketchRef.current.clearCanvas() }}>Clear Canvas</button>
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
