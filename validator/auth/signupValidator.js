const {body}=require('express-validator')
const User=require('../../models/User')

module.exports=[
     body('username')
     .isLength({min:2,max:15})
     .withMessage('Username must be between 2 to 15 char')
     .custom(async username=>{
         let user=await User.findOne({username})
         if(user){
             return Promise.reject('Username already exixt')
         }
     }).trim(),

     body('email')
     .isEmail()
     .withMessage('Please provide a valid email')
     .custom(async email=>{
         let user=await User.findOne({email})
         if(user){
             return Promise.reject('Email already exixt')
         }
     }).normalizeEmail(),

     body('password')
     .isLength({min:6})
     .withMessage('Password must be grater than 5 char'),

     body('confirmPassword')
     .isLength({min:5})
     .withMessage('Password must be greater than 5 char')
     .custom((confirmPassword,{req})=>{
         if(confirmPassword!=req.body.password){
             //return new Error('Password does not match')
             return Promise.reject('Password does not match')
         }
         return true
     })
]