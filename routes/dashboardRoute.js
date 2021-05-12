const route=require('express').Router()
const {isAuthenticated}=require('../middlewares/authMiddleWare')

const {dashboardGetController,createProfileGetController,createProfilePostController,editProfileGetController,editProfilePostController}=require('../controllers/dashboardController')
const profileValidator=require('../validator/dashboard/profileValidator')

route.get('/',isAuthenticated,dashboardGetController)



route.get('/create-profile',isAuthenticated,createProfileGetController)
route.post('/create-profile',isAuthenticated,profileValidator,createProfilePostController)


route.get('/edit-profile',isAuthenticated,editProfileGetController)
route.post('/edit-profile',isAuthenticated,profileValidator,editProfilePostController)


module.exports=route 