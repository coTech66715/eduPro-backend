const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true
    },
    phoneNumber: String,
    programme: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    description: String,
    files: [String]
}, {timestamps: true})

const Assignment = mongoose.model('Assignment', assignmentSchema)
module.exports = Assignment