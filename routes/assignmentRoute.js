const express = require('express')
const { submitAssignment, getRecentAssignments, getAllAssignments } = require('../controllers/assignmentController')
const upload = require('../config/upload')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/submit', authMiddleware,  upload.array('files'), submitAssignment)

router.get('/recent', authMiddleware, getRecentAssignments)

router.get('/all', authMiddleware, getAllAssignments)

module.exports = router