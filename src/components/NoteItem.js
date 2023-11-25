import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const {note,updateNote} = props;


    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* <p className="card-text">{note._id}</p> */}
                    <p className="card-text">{note.tag}</p>
                    <p className="card-text">{note.priority}</p>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
                    
                </div>
            </div>
        </div>
    )
}
