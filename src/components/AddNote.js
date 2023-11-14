import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

export const AddNote = (props) => {
    const [date, setDate] = useState(new Date());
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "",priority:"",deadline:null })

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" ,priority:"",deadline:null });
        props.showAlert("Note Added Successfully", "success");
    }
    const onChange = (ele) => {
        setnote({ ...note, [ele.target.name]: ele.target.value })
    }

    const changeTag = (e) => {
        setnote({ ...note, tag: e.target.innerHTML })
    }
    const changePriority = (e) => {
        setnote({ ...note, priority: e.target.innerHTML })
    }

    return (
        <div>
            <div className="container my-2">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <div className="mb-3 d-flex">
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
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
                    <label htmlFor="tag" className="form-label">Priority</label>
                    <div className="mb-3 d-flex">
                        <input type="text" className="form-control" id="priority" name="priority" value={note.priority} onChange={onChange} />
                        <div className="dropdown" style={{ "marginLeft": "1rem" }}>
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" onClick={changePriority}>Top</a></li>
                                <li><a className="dropdown-item" onClick={changePriority}>High</a></li>
                                <li><a className="dropdown-item" onClick={changePriority}>Low</a></li>
                            </ul>
                        </div>
                    </div>
                    <label htmlFor="tag" className="form-label">Deadline</label>
                    <div>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </div>

                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary my-3" onClick={handleSubmit}  >Add note</button>
                </form>
            </div>
        </div>
    )
}
