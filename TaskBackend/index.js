const connectToMongo = require('./db');
const express  = require("express");
const mongoose=require("mongoose");

//connectToMongo();

const app=express();
const port = 5000;
var cors = require('cors')

app.use(express.json());
app.use(cors())

//available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})