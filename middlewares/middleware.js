const express=require('express')
const morgan=require('morgan')
const session=require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session)
const {bindUserWithRequest}=require('./authMiddleWare')
const setLocals=require('./setLocals')
const flash=require('connect-flash')

const Mongo_URL=`mongodb+srv://blog_application:ctO9RhauYLuNYjW8@cluster0.btawc.mongodb.net/blog_application?retryWrites=true&w=majority`

const store=new MongoDBStore({
    uri:Mongo_URL,
    collection:'session',
    expires:1000*60*60*2
})

const middleware=[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret:process.env.SECRET_KEY || 'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store:store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]


module.exports=(app)=>{
    middleware.forEach(m=>{
        app.use(m)
    })
}