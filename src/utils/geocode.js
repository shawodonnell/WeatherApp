const request = require('postman-request');

const geocode = (location, callback) => {

    const geoKey = "pk.eyJ1Ijoic29kb25uZWxsMjYiLCJhIjoiY2twbnlrcDY2NGpweTJ1bng5cjh1eXhiYiJ9.iBiYFU5koo9dzu3MNQeqIQ";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${geoKey}&limit=1`
        
    request({
        url:url,
        json: true
    },
    (err,res)=>{
        if(err){
            callback("Unable to connect to API: " + err); //2nd param undefined therefore not needed
        } else if (res.body.features.length === 0){
            callback("Location not found...") 
        } else {
            callback(undefined,{
                lat: res.body.features[0].center[1],
                long: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })//returning an object as allows for specific and multiple things to be returned)
        }
    })
}

module.exports = geocode;