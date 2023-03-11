var User = require('../models/userModel');
const { hashGenerate, hashValidate } = require('../helpers/hashing')
const { tokenGenerator } = require('../helpers/token')
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashPassword = await hashGenerate(password)
    try {
        const userDoc = await User.create({
            username,
            password: hashPassword
        });
        res.status(200).json({ message: "User Registration Successful" })
    } catch (error) {
        console.log("Error: Register User" + error)
        res.status(400).send("Error ocurred while registering User" + error)
    }
}

const loginUser = async (req, res) => {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) { res.status(401).send({ message: 'Invalid Username' }); }
        else {
            const checkUser = await hashValidate(password, existingUser.password)
            if (!checkUser) { res.status(401).json({ message: 'Incorrect Password' }) }
            else {
                const token = await tokenGenerator(existingUser.username)
                res.cookie('blogtoken', token).json({ id: existingUser._id, username, token });
            }
        }
    } catch (error) {
        res.send(`Error in Login User:${error}`)
    }
}


const logoutProfile = async (req, res) => {
    res.cookie("blogtoken", "").json('ok')
}

module.exports = {
    registerUser,
    loginUser,
    // verifyProfile,
    logoutProfile,
}


//<=========================================================================================> 
//<=============================== LEGACY CODES ============================================> 
//<=========================================================================================> 


// Server returns Error while verifying Hence updated with new code
/* const verifyProfile = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        console.log(!token)
        res.status(401).send({ message: "Token expired" })
    } else {
        await jwt.verify(token, process.env.JWT_KEY, {}, (err, info) => {
            if (err) throw console.log("JWT verify catch: " + err);
            res.status(200).json(info);
        });
    }
}
 */

//<=========================================================================================> 
