const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "pihuisagoodgirl";

// ROUTE 1: create a user no login require
router.post(
  "/createuser",
  [
    body("name", "enter name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "length of password must be 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({success, errors: errors.array() });
    }
    try {
      //check wether this email is already exists
      let user = await User.findOne({success, email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry aa user with this email already exists" });
      }
      //generating a hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occoured");
    }
  }
);
//ROUTE 2: authenticating a user using post endpoint login
router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password cannot be blank").exists()
], async (req, res) => {
  let success=false;
  //If there  are errors return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
  }

  const { email, password } = req.body;      //destructuring to get email and password
  try {

      //check if user's email exist in database
      let user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success,error: "Please enter correct credentials" });
      }

      //checking whether the password is valid
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
          return res.status(400).json({ success,error: "Please enter correct credentials" });
      }

      //data to be sent to user
      const data = {
          user: {
              id: user.id
          }
      }

      //creating authToken
      const authToken = jwt.sign(data, JWT_SECRET)
      success= true;
      res.json({ success,authToken });

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
}
)


//ROUTE 3: get loggedin user details using post request
router.post(
  "/getuser", fetchuser , async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password"); 
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error ");
    }
  }
);



module.exports = router;
