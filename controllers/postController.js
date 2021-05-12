const {validationResult}=require('express-validator')
const errorFormatter=require('../utils/validationErrorFormatter')
const Flash = require("../utils/Flash")
const Post=require('../models/Post')
const readingTime=require('reading-time')
const Profile=require('../models/Profile')

exports.createPostGetController=(req,res,next)=>{
    res.render('pages/dashboard/post/create-post',
    {
        title:'Create Post',
        flashMessage:Flash.getMessage(req),
        error:{},
        value:{}
    })
}


exports.createPostPostController=async(req,res,next)=>{
    
    let {title,body,tags}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped())
    console.log(title,body,tags)

    if(!errors.isEmpty()){
        return res.render('pages/dashboard/post/create-post',{
            title:'Create A new Post',
            flashMessage:Flash.getMessage(req),
            error:errors.mapped(),
            value:{title,body,tags}
        })
    }

    if(tags){
        tags=tags.split(',')
    } 


    let readTime=readingTime(body).text

    let post=new Post({
        title,
        body,
        tags,
        author:req.user._id,
        thumbnail:'',
        readTime,
        likes:[],
        dislikes:[],
        comments:[]
    })

    if(req.file){
        post.thumbnail=`/uploads/${req.file.filename}`
    }

    console.log(post)

    try{

        let createdPost=await post.save()

        await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$push:{'posts':createdPost._id}}
        )

        req.flash('success','Post created success')
        //return res.redirect('/dashboard')
        return res.redirect(`/posts/edit/${createdPost._id}`)

    }catch(e){
        next(e)
        console.log(e)
    }
    
    
}

exports.editPostGetController=async(req,res,next)=>{
    let postId=req.params.postId
    
    try{

        let post=await Post.findOne(
            {author:req.user._id,_id:postId}
        )

        if(!post){
            return res.json({
                message:'Post not found'
            })
        }

        return res.render('pages/dashboard/post/edit-post',
        {
            title:'Edit Post',
            error:{},
            flashMessage:Flash.getMessage(req),
            post
        })

    }catch(e){
        console.log(e)
        next(e)
    }
}


exports.editPostPostController=async(req,res,next)=>{
    let postId=req.params.postId
    let {title,body,tags}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)

    try{

        let post=await Post.findOne(
            {author:req.user._id,_id:postId}
        )

        if(!post){
            return res.json({
                message:'there is no post'
            })
        }

        if(!errors.isEmpty()){
            return res.render('pages/dashboard/post/edit-post',
            {
                title:'Edit Post',
                error:errors.mapped(),
                flashMessage:Flash.getMessage(req),
                post
            })
        }

        if(tags){
            tags=tags.split(',')
        }

        let thumbnail=post.thumbnail

        if(req.file){
            thumbnail=`/uploads/${req.file.filename}`
        }

        await Post.findOneAndUpdate(
            {_id:post._id},
            {$set:{title,body,tags,thumbnail}},
            {new:true}
        )

        req.flash('success','Post Update Success')
        res.redirect('/posts/edit/'+post._id)

    }catch(e){
        console.log(e)
        next(e)
    } 

}
 
exports.getDeletePostGetController=async(req,res,next)=>{


    let postId=req.params.postId

    try{

        let post=await Post.findOne({author:req.user._id,_id:postId})

        if(!post){
            return res.json({
                message:'This post is not yours'
            })
        }

        await Post.findOneAndDelete({_id:postId})
        await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$pull:{'posts':postId}}
        )

        req.flash('success','Post delete success')
        res.redirect('/dashboard')



    }catch(e){
        console.log(e)
        next(e)
    }

}



exports.postGetController=async(req,res,next)=>{
    try{

        let posts=await Post.find({author:req.user._id})

        return res.render('pages/dashboard/post/posts',
        {
            title:'My Posts',
            posts,
            flashMessage:Flash.getMessage(req)
        })

    }catch(e){
        console.log(e)
        next(e)
    }
}