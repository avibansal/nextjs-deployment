import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ipAddress: String,
    userAgent: String,
    expireAt: {
        type: Date,
        required: true
    },
}, { timestamps: true })

SessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.Session || mongoose.model("Session", SessionSchema)

