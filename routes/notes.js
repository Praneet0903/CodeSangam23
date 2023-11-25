const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: fetch all notes login required
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
    const {title,description,tag, dueDate,drawingData}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    
    const note = new Note({
        title, description,tag,dueDate,user: req.user.id,drawingData
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
    const {title,description,tag,drawingData} = req.body;
    try {
    //create a newNote object
    const newNote={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag=tag};
    if(drawingData)(newNote.drawingData=drawingData);

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
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //get note using unique id
    let note = await Note.findById(req.params.id);

    //check whether note exists
    if (!note) { return res.status(404).send("Note not found") };

    //check if the user is same
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

    //delete the note
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted", note: note });
})

//Router 5: fetch all deadlines
router.get("/fetchdeadline", fetchuser, async (req, res) => {
  try{
      const date = new Date();
      var dateTom = date.getDate()+1;
      const note = await Note.find({ user: req.user.id });
      let deadlines=[];
      for (let index = 0; index < note.length; index++) {
        const ded = {dead:note[index].dueDate,title:note[index].title};
        deadlines.push(ded);
      }
      res.json(deadlines);
  } catch(error){
      console.error(error.message);
      res.status(500).send("some nternal server error occoured");
  }
});


module.exports = router;
