const mongoose = require('mongoose');

const dbConnect = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected");
}

module.exports = dbConnect;