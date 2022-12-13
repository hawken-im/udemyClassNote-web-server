const request = require('postman-request')

const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGF3a2VuemVkIiwiYSI6ImNsOWR3MGx2MzA5dXYzcGxjcnMwY3JiMnoifQ.qjuZWQgT27tvLj0eA8CrUQ&limit=1'

    request({url:url,json:true},(error,_,response)=>{
        if (error){
            callback('Unable to connect',undefined)
        }else if (response.features.length===0) {
            callback('Unable to find location',undefined)
        }else{
            console.log('Requring weather data')
            console.log(response.features[0].place_name)
            callback(undefined,{
                latitude: response.features[0].center[1],
                longtitude: response.features[0].center[0],
                location:response.features[0].place_name
            })
        }
    })
}

module.exports = geocode