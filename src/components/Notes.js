import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, addNote, editNote } = context;
    const [note, setnote] = useState({ eid: "", etitle: "", edescription: "", etag: "   " })
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login');
        }

    }, [])

    // const sortedNotes = notes.slice().sort((a, b) => {
    //     const dateA = new Date(a.date);
    //     const dateB = new Date(b.date);
    //     return dateB - dateA;
    //   });

    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(note);
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Successfully", "success");
    }
    const onChange = (ele) => {
        setnote({ ...note, [ele.target.name]: ele.target.value })
    }

    const changeTag = (e) => {
        console.log(e.target.innerHTML);
        const tagVar = document.getElementById("etag");
        tagVar.value = e.target.innerHTML;
        setnote({ ...note, etag: e.target.innerHTML })

    }
    return (
        <>

            <AddNote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <div className="mb-3 d-flex">
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    <div className="dropdown" style={{ "marginLeft": "1rem" }}>
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Options
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" onClick={changeTag}>Personal</a></li>
                                            <li><a className="dropdown-item" onClick={changeTag}>Faluda</a></li>
                                            <li><a className="dropdown-item" onClick={changeTag}>Important</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <h2 className='my-2'>Your notes</h2>
                {notes.map((note) => { return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} /> }
                )}
            </div>
        </>
    )
}
