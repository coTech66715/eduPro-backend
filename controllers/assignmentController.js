const Assignment = require('../models/assignmentModel')
const path = require('path')
const fs = require('fs')

const submitAssignment = async (req, res) => {
    try {
        const { name, email, studentId, phoneNumber, programme, course, deadline, description} = req.body;
        const files = req.files.map(files => files.filename)

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

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

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
        .sort({ createdAt: -1})
        .populate('userId', 'name, email, programme, phoneNumber')
        res.status(200).json(assignments)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'})
    }
}

const downloadFile = async(req, res) => {
    try {
        const {assignmentId, filename} = req.params;

        const assignment = await Assignment.findById(assignmentId)
        if(!assignment) {
            return res.status(404).json({ message: 'Assignment not found'})
        }
        if(!assignment.files.includes(filename)){
            return res.status(404).json({ message: 'File not found for this assignment'})
        }

        const filePath = path.join(__dirname, '..', 'uploads', filename)

        if(fs.existsSync(filePath)){
            res.download(filePath, filename, (err) => {
                if(err) {
                    res.status(500).json({ message: 'Error downloading file'})
                }
            })
        } else {
            res.status(404).json({ message: 'File not found'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
}


const updateAssignmentStatus = async (req, res) => {
    try {
        const {assignmentId} = req.params;
        const {status} = req.body

        const assignment = await Assignment.findById(assignmentId)
        if(!assignment) {
            return res.status(404).json({ message: 'Assignment not found'})
        }

        assignment.status = status;
        await assignment.save()

        res.status(200).json({ message: 'Assignment status updated successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'})
    }
}


const completeAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { feedback, fee } = req.body;
        
        console.log('Request body:', req.body);
        console.log('Files:', req.files);

        const files = req.files ? req.files.map(file => ({
            name: file.filename,
            originalName: file.originalname,
            size: file.size,
            path: file.path
        })) : []

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.status = 'submitted';
        assignment.feedback = feedback;
        assignment.fee = parseFloat(fee);  
        if (files.length > 0) {
            assignment.completionFiles = files;
        }

        await assignment.save({validateBeforeSave:false});

        res.status(200).json({ message: 'Assignment completed successfully', files: assignment.completionFiles });
    } catch (error) {
        console.error('Error in completeAssignment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const paymentStatus = async(req, res) => {
    try {
        const { assignmentId } = req.params;
        const { paymentStatus } = req.body;

        const assignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { paymentStatus },
            { new: true}
        )

        if(!assignment) {
            return res.status(404).json({ message: 'Assingment not found'})
        }
        res.status(200).json({ message: 'Payment status updated successfully', assignment})
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Server error'})
    }
}

const completed = async(req, res) => {
    try {
        const completedAssignments = await Assignment.find({
            userId: req.user._id,
            status: 'submitted'
        }).sort({ updatedAt: -1})
        res.status(200).json(completedAssignments)
    } catch (error) {
        console.error('Error fetching completed assignments:', error);
        res.status(500).json({ message: 'Server error'})
    }
}

module.exports = { submitAssignment, getRecentAssignments, getAllAssignments, downloadFile, completeAssignment, updateAssignmentStatus, paymentStatus, completed}