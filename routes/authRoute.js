const route=require('express').Router()
const signupvalidator=require('../validator/auth/signupValidator')
const signinValidator=require('../validator/auth/signinValidator')
const {isUnAuthenticated}=require('../middlewares/authMiddleWare')

const {signupGetController,signupPostController,signinGetController,signinPostController,signoutController}=require('../controllers/authController')

route.get('/signup',isUnAuthenticated,signupGetController)
route.post('/signup',isUnAuthenticated,signupvalidator,signupPostController)

route.get('/signin',isUnAuthenticated,signinGetController)
route.post('/signin',isUnAuthenticated,signinValidator,signinPostController)

route.get('/signout',signoutController)

module.exports=route