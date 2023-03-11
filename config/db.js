const mongoose = require('mongoose')
mongoose.set('strictQuery', false);


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log(`MongoDB Connection successful: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: Database connection failed: ${error}`);
        process.exit(1)
    }
}

module.exports = connectDB