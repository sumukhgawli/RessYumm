import express from "express";
import '../db/conn.js';
import bcrypt from "bcrypt";
import User from '../model/userSchema.js'
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        // check all the data entered
        const { name, password, c_password, email } = req.body;
        const ValidateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (!name || !password || !c_password || !email) {
            return res.status(422).json({ error: "field incorrect" })
        } else if (!(password === c_password)) {
            return res.status(422).json({ error: "Passwords Don't Match" })
        }
        if (ValidateEmail === false) {
            return  res.status(422).json({ error: "Enter a valid email" })
        }
        // also check for confirm password 
        const result = await User.findOne({ name: name });
        if (result) {
            return res.status(422).json({ error: "User already Exist" })
        }
        const user = new User(req.body);
        // console.log(req.body)
        // Encryption is done here before save()
        const userReg = await user.save();

        if (userReg) {
            // console.log("Data Added in DB");
            res.status(201).json({ message: "User Registered Sucessfully" })
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/signin', async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(422).json({ error: "field incorrect" })
        }
        const result = await User.findOne({ name: name });

        if (result) {
            // checking the hashed data
            const isMatch = await bcrypt.compare(password, result.password);
            // generating token
            const token = await result.generateAuthToken();
            // setting cookies and expire it after 30 days
            try {
                res.cookie("jwtoken", token, { expire: new Date(Date.now() + 25892000000) }, { httpOnly: true })
            } catch (error) {
                console.log(error)
            }


            if (!isMatch) {
                return res.status(422).json({ error: "field incorrect" })

            } else {
                return res.status(200).json({ message: "Login sucessfull" })
            }
        } else {
            return res.status(422).json({ error: "field incorrect" })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/about', async (req, res) => {
    const { name } = req.body;
    const result = await User.findOne({ name: name });
    res.send(result);
})
export default router;