const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`Connection made ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    };
};

module.exports = { connectDB };