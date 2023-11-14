const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { update } = require("../models/User");


//ROUTE 1: fetch all user notes using: GET Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        //getting all notes
        const fetchedNotes = await Notes.find({ user: req.user.id });
        res.json(fetchedNotes);
    } catch (error) {
        //error catching
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: create notes using: POST Login required
router.post('/addnote', fetchuser, [
    body('title', "Length of title is too less").isLength({ min: 5 }),
    body('description', "Length of description is too less").isLength({ min: 5 })
], async (req, res) => {

    //If there  are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //destructuring to get data
        const { title, description, tag ,deadline,priority} = req.body;

        //adding note to db
        const note = await Notes.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag,
            deadline: deadline,
            priority: priority,
        })
        res.json(note)
    } catch (error) {
        //error catching
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: update notes using: PUT Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    //destructuring
    const { title, description, tag,deadline,priority } = req.body;

    //creating the updated note
    const updateNote = {};
    if (title) { updateNote.title = title };
    if (description) { updateNote.description = description };
    if (tag) { updateNote.tag = tag };
    if (deadline) { updateNote.deadline = deadline };
    if (priority) { updateNote.priority = priority };

    //get note using unique id
    let note = await Notes.findById(req.params.id);

    //check whether note exists
    if (!note) { return res.status(404).send("Note not found") };

    //check if the user is same
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

    //update the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });

    res.json(note);

})

//ROUTE 4: Delete notes using: DELETE Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //get note using unique id
    let note = await Notes.findById(req.params.id);

    //check whether note exists
    if (!note) { return res.status(404).send("Note not found") };

    //check if the user is same
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

    //delete the note
    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted", note: note });
})

module.exports = router