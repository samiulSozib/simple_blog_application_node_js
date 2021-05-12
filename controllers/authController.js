const bcrypt=require('bcrypt')
const User=require('../models/User')
const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')
const Flash=require('../utils/Flash')


exports.signupGetController=(req,res,next)=>{
    res.render('pages/auth/signup',{title:'SignUp',error:{},value:{},flashMessage:Flash.getMessage(req)})
}


exports.signupPostController=async(req,res,next)=>{
    let {username,email,password,confirmPassword}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        req.flash('fail','Please check your Information')
        return res.render('pages/auth/signup',
        {title:'SignUp',error:errors.mapped(),value:{username,email},flashMessage:Flash.getMessage(req)})
    }

    
    try{

        let hashPassword=await bcrypt.hash(password,11)
    
        let user=new User({
            username,
            email, 
            password:hashPassword
        })

        let createdUser=await user.save()
        req.flash('success','Signup Success')
        console.log(createdUser)
        return res.redirect('/auth/signin')

    }catch(e){
        console.log(e)
        next(e)
    }

    
}



exports.signinGetController=(req,res,next)=>{
    //console.log(req.session.isLoggedIn,req.session.user)
    res.render('pages/auth/signin',{title:'SignIn',error:{},flashMessage:Flash.getMessage(req)})
}


exports.signinPostController=async(req,res,next)=>{
    let {email,password}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)
    console.log(req.body)

    if(!errors.isEmpty()){
        req.flash('fail','Please check your form')
        return res.render('pages/auth/signin',{title:'SignIn',error:errors.mapped(),flashMessage:Flash.getMessage(req)})
    }

    try{

        let user=await User.findOne({email})
        if(!user){
            req.flash('fail','Please provide valid information')
            console.log('Login Fail')
            return res.render('pages/auth/signin',{title:'Signin',error:{},flashMessage:Flash.getMessage(req)})
        }

        let match=await bcrypt.compare(password,user.password)

        if(!match){
            req.flash('fail','Please provide valid information')
            console.log('Password doesnt match')
            return res.render('pages/auth/signin',{title:'Signin',error:{},flashMessage:Flash.getMessage(req)})
        }

        req.session.isLoggedIn=true
        req.session.user=user
        req.session.save(error=>{
            if(error){
                console.log(error)
                return next(error)
            }
            req.flash('success','Login Success')
            res.redirect('/dashboard')
        })

        console.log('Login success',user)
        

    }catch(e){
        console.log(e)
        next(e)
    }

}

exports.signoutController=(req,res,next)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error)
            return newxt(eror)
        }

        res.redirect('/auth/signin')
    })
}