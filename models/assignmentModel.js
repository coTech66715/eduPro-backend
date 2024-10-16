const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    phoneNumber: {
        type: String
    },
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
    files: [{type: String}],
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'submitted'],
        default: 'pending'
    },
    feedback: String,
    fee: Number,
    completionFiles: [{type: String}]
}, {timestamps: true})

const Assignment = mongoose.model('Assignment', assignmentSchema)
module.exports = Assignment