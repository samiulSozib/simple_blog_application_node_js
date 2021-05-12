// user,name, title, bio, pro_pic, links:{fb,twitter}, posts, bookmarks

const {Schema,model}=require('mongoose')


const profileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    name:{
        type:String,
        require:true,
        trim:true,
        maxlength:50
    },
    title:{
        type:String,
        require:true,
        trim:true,
        maxlength:100
    },
    bio:{
        type:String,
        trim:true,
        required:true,
        maxlength:500
    },
    profilePics:String,
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
},{
    timestamps:true
})

const Profile=model('Profile',profileSchema)
module.exports=Profile