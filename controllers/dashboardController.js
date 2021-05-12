const { validationResult } = require("express-validator")
const Profile = require("../models/Profile")
const User = require("../models/User")
const Flash = require("../utils/Flash")
const errorFormetter=require('../utils/validationErrorFormatter')

exports.dashboardGetController=async(req,res,next)=>{

    try{

        let profile=await Profile.findOne({user:req.user._id})
        if(profile){
            return res.render('pages/dashboard/dashboard',{title:'My Dashboard',flashMessage:Flash.getMessage(req)})
        }
        res.redirect('/dashboard/create-profile')

    }catch(e){
        next(e)
    }

    // res.render('pages/dashboard/dashboard',{title:'Dashboard',flashMessage:Flash.getMessage(req)})
}

exports.createProfileGetController=async(req,res,next)=>{
    try{

        let profile=await Profile.findOne({user:req.user._id})
        if(profile){
            return res.redirect('/dashboard')
        }
        res.render('pages/dashboard/create-profile',{title:'Create Profile',flashMessage:Flash.getMessage(req),error:{}})

    }catch(e){
        next(e)
    }
}

exports.createProfilePostController=async(req,res,next)=>{
    let errors=validationResult(req).formatWith(errorFormetter)
    if(errors){
        console.log(errors.mapped())
    }

    if(!errors.isEmpty()){
        return res.render('pages/dashboard/create-profile',
        {
            title:'Create Profile',
            flashMessage:Flash.getMessage(req),
            error:errors.mapped()
        })
    }

    let{
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    }=req.body

    try{

        let profile=new Profile({
            user:req.user._id,
            name,
            title,
            bio,
            profilePics:req.user.profilePics,
            links:{
                website:website||'',
                facebook:facebook||'',
                twitter:twitter||'',
                github:github||''
            },
            posts:[],
            bookmarks:[]
        })

        let createdProfile=await profile.save()
        await User.findOneAndUpdate(
            {_id:req.user._id},
            {$set:{profile:createdProfile._id}}
        )

        req.flash('success','Profile Created Successful')
        res.redirect('/dashboard')


    }catch(e){
        console.log(e)
        next(e)
    }

}

exports.editProfileGetController=async(req,res,next)=>{
    try{

        let profile=await Profile.findOne({user:req.user._id})
        if(!profile){
            return res.redirect('/dashboard/create-profile')
        }

        res.render('pages/dashboard/edit-profile',
        {
            title:'Edit Profile',
            flashMessage:Flash.getMessage(req),
            error:{},
            profile
        })

    }catch(e){
        console.log(e)
        next(e)
    }
}

exports.editProfilePostController=async(req,res,next)=>{
    let errors=validationResult(req).formatWith(errorFormetter)

    let profile=await Profile.findOne({user:req.user._id})
    let {
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    }=req.body

    if(!errors.isEmpty()){
        return res.render('pages/dashboard/edit-profile',
        {
            title:'Edit Profile',
            flashMessage:Flash.getMessage(req),
            error:errors.mapped(),
            profile
        })
    }

    try{

        let profile={
            name,
            title,
            bio,
            links:{
                website:website||'',
                facebook:facebook||'',
                twitter:twitter||'',
                github:github||''
            }
        }

        let updatedProfile=await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$set:profile},
            {new:true}
        )

        req.flash('success','Profile Update Successful')
        res.render('pages/dashboard/edit-profile',
        {
            title:'Edit Profile',
            flashMessage:Flash.getMessage(req),
            error:{},
            profile:updatedProfile
        })

    }catch(e){
        console.log(e)
        next(e)
    }
}