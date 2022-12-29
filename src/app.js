const path = require('path')
const express = require('express')
const res = require('express/lib/response')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

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
//    console.log(req.route.path)
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


app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        errmsg:'help page not found',
        name:'Hawken'
    })
})

app.get('/weather',(req,res)=>{
    //console.log('some request:',req)
    if(!req.query.address){
        return res.send({
            error:'No address provided.'
        })
    }

    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if (error){return res.send({error})}
        forecast(latitude,longtitude,(error,data)=>{
            if (error){return res.send({error})}
            res.send({
                forecast:data,
                location,
                address:req.query.address
            })
        })
    })
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'No search term. Please provide.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404',
        errmsg:'page not found',
        name:'Hawken'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})