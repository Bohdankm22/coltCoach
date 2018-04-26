const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseCode: String,
    courseName: String,
    section: String,
    semester: String,
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Course', CourseSchema);
