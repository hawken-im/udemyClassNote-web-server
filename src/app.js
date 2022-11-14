const path = require('path')
const express = require('express')
const res = require('express/lib/response')



const publicDirectoryPath = path.join(__dirname,'../public')
const app = express()

app.set('view engine','hbs')

app.use(express.static(publicDirectoryPath))

//app.use(express.static)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Junkdog'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Hawken'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'this is help text'
    })
})

app.get('/weather',(_,res)=>{
    //console.log('some request:',req)
    res.send({weather:'hot'})
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})