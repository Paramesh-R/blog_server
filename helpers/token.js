const jwt = require('jsonwebtoken');

const tokenGenerator = async (username) => {
    const token = await jwt.sign(
        { username },
        process.env.JWT_KEY,
        { expiresIn: '50m' }
    )
    return token
}


const tokenValidator = (token) => {
    try {
        // const data = jwt.verify(token, process.env.JWT_KEY)
        jwt.verify(token, process.env.JWT_KEY, {}, (err, info) => {
            if (err) throw err;
            return (info)
        })
    } catch (error) {
        return false;
    }
}
module.exports = { tokenGenerator, tokenValidator }