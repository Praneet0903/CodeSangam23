const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Praneetisthegoat"


//ROUTE 1:Create a user using: POST  "/api/auth/createuser" No login required
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //If there  are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        //check whether user with same email exists
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success,error: "A user with the same email already exists" })
        }

        //encrypting password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        //data to be sent to user
        const data = {
            user: {
                id: user.id
            }
        }

        //creating authToken
        const authToken = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({ success,authToken });
    }
    catch (error) {
        //error catching
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2:Verifying a user using: POST  "/api/auth/login" No login required
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

//ROUTE 3:Getting logged in user details using: POST  "/api/auth/getuser"  login required

router.post('/getuser',fetchuser, async (req, res) => {
try {
    userId =req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


module.exports = router