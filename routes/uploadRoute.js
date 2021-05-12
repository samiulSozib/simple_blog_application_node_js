const route=require('express').Router()

const {isAuthenticated}=require('../middlewares/authMiddleWare')
const upload=require('../middlewares/uploadMiddleware')
const {uploadProfilePics,removeProfilePics,postImageUploadController}=require('../controllers/uploadController')

route.post('/profilePics',isAuthenticated,upload.single('profilePics'),uploadProfilePics)
route.delete('/profilePics',isAuthenticated,removeProfilePics)

route.post('/postimage',isAuthenticated,upload.single('post-image'),postImageUploadController)

module.exports=route