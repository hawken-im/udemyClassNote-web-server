const path = require('path')
const express = require('express')
const res = require('express/lib/response')



const publicDirectoryPath = path.join(__dirname,'../public')
const app = express()

app.use(express.static(publicDirectoryPath))

//app.use(express.static)


app.get('/weather',(_,res)=>{
    //console.log('some request:',req)
    res.send({weather:'hot'})
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})