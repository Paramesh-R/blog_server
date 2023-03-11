const bcrypt = require("bcrypt")
const saltRounds = 10;

const hashGenerate = async (plainPassword) => {
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(plainPassword, salt);
        return hash;
    } catch (error) {
        console.log(`Error: hashGenerate `);
    }
}

const hashValidate = async (plainPassword, hashedPassword) => {
    try {
        const result = await bcrypt.compareSync(plainPassword, hashedPassword)
        return result
    } catch (error) {
        console.log(`Error: hashGenerate `);
    }
}


module.exports = { hashGenerate, hashValidate }