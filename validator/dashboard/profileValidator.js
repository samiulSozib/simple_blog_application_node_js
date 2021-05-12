const { body }=require('express-validator')
const validator=require('validator')

const linkvalidator=value=>{
    if(value){
        if(!validator.isURL(value)){
            throw new Error('Please provide a valid url')
        }
    }
    return true
}


module.exports=[
    body('name')
        .not().isEmpty().withMessage('Name can not be empty')
        .isLength({max:50,min:2}).withMessage('Name can not be more then 50 char and less then 2')
        .trim(),

    body('title')
        .not().isEmpty().withMessage('Title can not be empty')
        .isLength({max:100}).withMessage('Title can not be more then 100 chars')
        .trim(),

    body('bio')
        .not().isEmpty().withMessage('Bio can not be empty')
        .isLength({max:500}).withMessage('Bio can not be more then 500 chars')
        .trim(),

    body('website')
        .custom(linkvalidator).trim(),
    
    body('facebook')
        .custom(linkvalidator).trim(),
    
    body('twitter')
        .custom(linkvalidator).trim(),

    body('github')
        .custom(linkvalidator).trim(),
]
