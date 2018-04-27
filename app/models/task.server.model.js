const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    taskName: String,
    courseCode: String,
    courseName: String,
    status: ['Active','Done', 'Deleted'],
    Description: String,
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    Importance: {
        type: Boolean,
        default: true
    }
});
mongoose.model('Task', TaskSchema);
