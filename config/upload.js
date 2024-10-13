const multer = require('multer')
const path = require('path')

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx|ppt|xlsx|odt/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true)
    } else {
        cb('Error: Only images and docs are allowed!')
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 20 *1024 * 1024},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

module.exports = upload