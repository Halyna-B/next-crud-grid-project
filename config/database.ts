import * as mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (connected) {
        console.log('MongoDB is connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        connected = true;
    }catch (error){
        console.error(error);
    }
};

export default connectDB;