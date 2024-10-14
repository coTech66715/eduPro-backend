const Assignment = require('../models/assignmentModel')

const submitAssignment = async (req, res) => {
    try {
        const { name, email, studentId, phoneNumber, programme, course, deadline, description} = req.body;
        const files = req.files.map(files => files.filename)

        const newAssignment = new Assignment({
            userId: req.user._id,
            name,
            email,
            studentId,
            phoneNumber,
            programme,
            course, 
            deadline,
            description,
            files
        })


        await newAssignment.save()
        res.status(201).json({ message: 'Assignment submitted successfully!'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'})
    }
}

const getRecentAssignments = async(req, res) => {
    try {
        const assignments = await Assignment.find({userId: req.user._id})
        .sort({ createdAt: -1})
        .limit(5);

        if(assignments.length === 0) {
            return res.status(404).json({ message: 'No recent assignment found'})
        }
        res.status(200).json(assignments)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'})
    }
}

module.exports = { submitAssignment, getRecentAssignments}