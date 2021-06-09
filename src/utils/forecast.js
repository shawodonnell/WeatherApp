const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const weatherKey = "4da7578ad37ba26afab462d2f7fc9689";
    const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${lat},${long}`;

    request({
        url:url,
        json:true
    },(err,res)=>{
        if(err){
            callback("Could not connect" + err)
        } 
        if(Object.keys(res).length ===0) {
            callback("Location not found... "+err)
        } else {
            callback(undefined, {
                temp: res.body.current.temperature,
                feelsLike: res.body.current.feelslike,
                location: res.body.location.name +", "+res.body.location.region,

            })
        }

    })


}

module.exports = forecast;