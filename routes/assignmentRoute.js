const express = require('express')
const { submitAssignment, getRecentAssignments } = require('../controllers/assignmentController')
const upload = require('../config/upload')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/submit', authMiddleware,  upload.array('files'), submitAssignment)

router.get('/recent', authMiddleware, getRecentAssignments)

module.exports = router