import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL
let is_connected = false

export async function dbConnect() {
    try {
        if (is_connected) {
            return
        }

        if (!MONGODB_URI) {
            throw new Error("MONGODB_URL is missing from .env")
        }

        const db = await mongoose.connect(MONGODB_URI)
        is_connected = db.connections[0].readyState === 1
        console.log("Database connected successfully")
    }
    catch (error) {
        console.error("Database connection error:", error)
        throw error // Re-throw to prevent handlers from waiting indefinitely
    }
}