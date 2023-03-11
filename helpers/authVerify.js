const { tokenValidator } = require('../helpers/token');

module.exports = async function (req, res, next) {
    try {
        const { jwt } = req.cookies;
        const valid = await tokenValidator(jwt);
        if (valid) {
            // next();
            res.json(valid)
        } else {
            res.send("Access Denied");
        }
    } catch (error) {
        res.send(error)
    }
}