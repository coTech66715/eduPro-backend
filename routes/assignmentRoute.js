const express = require('express')
const { submitAssignment } = require('../controllers/assignmentController')
const upload = require('../config/upload')
const router = express.Router()

router.post('/submit', upload.array('files'), submitAssignment)

module.exports = router