const route=require('express').Router()
const {createPostGetController,createPostPostController,editPostGetController,editPostPostController,getDeletePostGetController,postGetController}=require('../controllers/postController')
const { isAuthenticated } = require('../middlewares/authMiddleWare')
const postValidator=require('../validator/dashboard/post/postValidator')
const upload=require('../middlewares/uploadMiddleware')

route.get('/create',isAuthenticated,createPostGetController)
route.post('/create',isAuthenticated,upload.single('post-thumbnail'),postValidator,createPostPostController)


route.get('/edit/:postId',isAuthenticated,editPostGetController)
route.post('/edit/:postId',isAuthenticated,upload.single('post-thumbnail'),postValidator,editPostPostController)

route.get('/delete/:postId',isAuthenticated,getDeletePostGetController)

route.get('/my-posts',isAuthenticated,postGetController)

module.exports=route