import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'name cannot exceed 20 characters']
    },
    Completed: {
        type: Boolean,
        default: false
    },
})

const task = mongoose.model('Task', TaskSchema);

export default task;