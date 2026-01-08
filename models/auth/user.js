import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
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
    },
    avatarUrl: {
        type: String,
        default: null
    }
})

UserSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    // next()
})

UserSchema.methods.comparePassword = async function (password) {
    if (!this.password) return false
    return await bcrypt.compare(password, this.password)
}


export default mongoose.models.User || mongoose.model("User", UserSchema)