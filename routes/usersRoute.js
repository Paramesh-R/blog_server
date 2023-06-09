var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware
const authVerify = require('../helpers/authVerify')

// Controller Imports
const {
  registerUser, loginUser, logoutProfile,   // verifyProfile
} = require("../controller/userController")



// Post and Comment Router Handle
router.get('/', function (req, res, next) { res.send('respond with a resource') });
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutProfile)


router.get('/profile', async (req, res) => {
  const { blogtoken } = req.cookies;

  try {
    if (!blogtoken) {
      console.log("Not a valid Token: " + !blogtoken)
      res.status(401).send({ message: "Profile validation: Token not found" })
    } else {
      console.log("\nProfile validation: blog token valid Verify")
      jwt.verify(blogtoken, process.env.JWT_KEY, {}, (err, info) => {
        if (err) {
          console.log("\nJWT verify catch: " + err);
          res.status(401).send({ message: "Token Expired" })
        }
        console.log("Verify 200 or 304")
        res.status(200).json(info)
      })
    }

  } catch (e) {
    res.status(401).send('invalid token' + e)
  }

})




// EXPORTS

module.exports = router;

