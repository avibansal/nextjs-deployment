import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    // next()
})

if (mongoose.models.User) {
    delete mongoose.models.User;
}

export default mongoose.model("User", userSchema)