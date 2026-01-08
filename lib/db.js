import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

let isConnected = false;

export default async function dbConnect() {

    if (isConnected) {
        console.log("Already connected to mongodb");
        return;
    }
    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to mongodb");
    }
    catch (error) {
        console.log("Error connecting to mongodb", error);
        throw error;
    }
}