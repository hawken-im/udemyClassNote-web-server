//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('postman-request')

const weather = (latitude, longtitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?query='+ encodeURIComponent(latitude)+','+ encodeURIComponent(longtitude)+'&access_key=9bb570633de9ff022bf46d7a34341704'
    console.log(url)
    request(url,{json:true},(error,_,response)=>{
        if(error){
            callback('Something wrong...',undefined)
        } else if (response.error){
            callback(response.error,undefined)
        }else{
            callback(undefined,
                    'It is currently '+ response.current.temperature + ' degree outside'
                     +". It is "+ response.current.weather_descriptions[0] +'.'
        )}
    })
}


module.exports = weather