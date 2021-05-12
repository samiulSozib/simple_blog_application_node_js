require('dotenv').config()

const express=require('express')
const morgan = require('morgan')
const mongoose=require('mongoose')

// import middleware
const setMiddleware=require('./middlewares/middleware')

// import routes
const setRoutes=require('./routes/routes')

const app=express()

app.set('view engine','ejs')
app.set('views')


// set middleware
setMiddleware(app)

//set routes
setRoutes(app)



const PORT=process.env.PORT || 8000
const DB_NAME=process.env.DB_NAME
const DB_PASSWORD=process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.btawc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('database connect success')
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`)
    })
}).catch(e=>{
    return console.log(e)
})
