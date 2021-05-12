const { body }=require('express-validator')
const User=require('../../models/User')

module.exports=[
    body('email')
    .not().isEmpty()
    .withMessage('Email can not be empty'),


    body('password')
    .not().isEmpty()
    .withMessage('Password can not be empty')
]