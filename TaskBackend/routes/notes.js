const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: create a user no login require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch(error){
        console.error(error.message);
        res.status(500).send("some nternal server error occoured");
    }
});

// ROUTE 2:add a new note  using post
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter  a valid title").isLength({ min: 3 }),
    //body("email", "enter a valid email").isEmail(),
    body("description", "length of description must be atleast 5").isLength({ min: 5 }),
  ],
    async (req, res) => 
    {
    try{
    const {title,description,tag, dueDate}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const note = new Note({
        title, description,tag,dueDate,user: req.user.id
    })
    const saveNote = await note.save()

    res.json(saveNote);
    } catch(error){
        console.error(error.message);
      res.status(500).send("some nternal server error occoured");
    }
})


//ROUTE 3: update a existing note //login require
router.put(
  "/updatenote/:id",fetchuser,async (req, res) => {
    const {title,description,tag} = req.body;
    try {
    //create a newNote object
    const newNote={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag=tag};

    //find the note to be update
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not allowed");
    }

    if(note.user.toString() !== req.user.id){
      return  res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note})
  } catch (error) {
      
  }
})


router.put(
  "/updatedone/:id",fetchuser,async (req, res) => {
    const {done} = req.body;
    try {
    //create a newNote object
    const newNote={};
    {newNote.done=done};

    //find the note to be update
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not allowed");
    }

    if(note.user.toString() !== req.user.id){
      return  res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note})
  } catch (error) {
      
  }
})


//ROUTE 4:delete a existing note //login require
router.delete(
  "/deletenote/:id",fetchuser,async (req, res) => {
    const {title,description,tag} = req.body;
    try {
    //find the note to be deleted
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not found");
    }

    if(note.user.toString() !== req.user.id){
      return  res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"sucess" : "note has been deleted",note:note})
  } catch (error) {
      
  }
})


module.exports = router;
