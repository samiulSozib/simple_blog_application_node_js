const authRoute=require('./authRoute')
const dashboardRoute=require('./dashboardRoute')
const uploadRoute=require('./uploadRoute')
const postRoute=require('./postRoute')
const apiRoute=require('../api/routes/apiRoutes')
const explorerRoute=require('./explorerRoute')
const searchRoute=require('./searchRoute')
const authorRoute=require('./authorRoute')

const routes=[
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/dashboard',
        handler:dashboardRoute
    },
    {
        path:'/posts',
        handler:postRoute
    },
    {
        path:'/uploads',
        handler:uploadRoute
    },
    {
        path:'/explorer',
        handler:explorerRoute
    },
    {
        path:'/search',
        handler:searchRoute
    },
    {
        path:'/author',
        handler:authorRoute
    },
    {
        path:'/api',
        handler:apiRoute
    },
    {
        path:'/',
        handler:(req,res)=>{
            res.redirect('/explorer')
        }
    }
]


module.exports=(app)=>{
    routes.forEach(r=>{
        if(r.path=='/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}