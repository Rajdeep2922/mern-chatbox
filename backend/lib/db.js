import mongoose from "mongoose";

//Connect to MongoDb
export const connectDB = async() =>{
    try {

        mongoose.connection.on('connected',()=> console.log('Database Connected'));
        
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-box`)
    } catch (error) {
        console.log(error);
    }
}