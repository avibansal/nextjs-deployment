import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "inprogress", "completed"],
        required: true,
        trim: true,
        default: "pending"
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

TaskSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    // next()
})

// In development, Next.js hot-reloads files, which can lead to stale models.
// We delete the model from the cache to ensure the latest schema is used.
if (mongoose.models.Task) {
    delete mongoose.models.Task;
}

export default mongoose.model("Task", TaskSchema)