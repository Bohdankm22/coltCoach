const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    Name: String,
    Importance: String,
    courseCode: String,
    courseName: String,
    Folder: String,
    Description: String,
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Task', TaskSchema);
