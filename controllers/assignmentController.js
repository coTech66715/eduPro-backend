const Assignment = require('../models/assignmentModel')

const submitAssignment = async (req, res) => {
    try {
        const { name, email, studentId, phoneNumber, programme, course, deadline, description} = req.body;
        const files = req.files.map(files => files.filename)

        const newAssignment = new Assignment({
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

module.exports = { submitAssignment}