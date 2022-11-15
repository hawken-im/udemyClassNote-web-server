const path = require('path')
const express = require('express')
const res = require('express/lib/response')
const hbs = require('hbs')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup hbs engine ande views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Hawken'
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
        helpText:'this is help text',
        name:'Hawken'
    })
})

app.get('/weather',(_,res)=>{
    //console.log('some request:',req)
    res.send({weather:'hot'})
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})