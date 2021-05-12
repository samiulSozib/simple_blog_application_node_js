const router=require('express').Router()
const {isAuthenticated}=require('../../middlewares/authMiddleWare')
const {commentPostController,replyCommentPostController}=require('../controllers/commentController')
const {likeGetController,dislikesGetController}=require('../controllers/likeDislikeController')
const {bookmarksGetController}=require('../controllers/bookmarksController')

router.post('/comments/:postId',isAuthenticated,commentPostController)
router.post('/comments/replies/:commentId',isAuthenticated,replyCommentPostController)


router.get('/likes/:postId',isAuthenticated,likeGetController)
router.get('/dislikes/:postId',isAuthenticated,dislikesGetController)


router.get('/bookmarks/:postId',isAuthenticated,bookmarksGetController)



module.exports=router