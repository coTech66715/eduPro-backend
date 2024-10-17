const express = require('express')
const { submitAssignment, getRecentAssignments, getAllAssignments, downloadFile, updateAssignmentStatus, completeAssignment, paymentStatus, completed } = require('../controllers/assignmentController')
const upload = require('../config/upload')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/submit', authMiddleware,  upload.array('files'), submitAssignment)

router.get('/recent', authMiddleware, getRecentAssignments)

router.get('/all', authMiddleware, getAllAssignments)

router.get('/download/:assignmentId/:filename', authMiddleware, downloadFile)

router.patch('/:assignmentId/status', authMiddleware, updateAssignmentStatus)

router.patch('/:assignmentId/complete', authMiddleware, upload.array('files'), completeAssignment)

router.patch('/:assignmentId/payment-status', authMiddleware, paymentStatus)

router.get('/completed', authMiddleware, completed)

module.exports = router