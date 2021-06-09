//REQUIRES - Modules and Files
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//EXPRESS AND PATH DECLARATIONS
const app = express(); 
const port = process.env.PORT || 3000; //IF OR shorthand
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')
const staticPages = path.join(__dirname,"../public");

//CUSTOMISING HBS VIEWS AND FILPATH
app.set('view engine', 'hbs')
app.set('views', viewsPath); 
hbs.registerPartials(partialsPath);

//STATIC PAGE ROUTING - IF PRESENT/NEEDED
app.use(express.static(staticPages))

//URL ROUTING AND ACTIONS
app.get('',(req,res)=>{
    res.render('index', {
        title:"Weather Forecast Service",
        author:"Shaw ODonnell"
    });
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:"About the Weather App",
        author:"Shaw ODonnell"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Weather App Help",
        author:"Shaw ODonnell"
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.location){
        return res.send("Please enter location for search");
    }
    geocode(req.query.location,(error, data) =>{
        if(!error){
            forecast(data.lat,data.long,(err,data)=>{
                if(err){
                    return res.send({
                        error: err
                    });
                } else {
                    res.send({
                        location:data.location,
                        temperature: data.temp,
                        feelsLike: data.feelsLike
                    })
                }
            })
        } else {
            res.send({
                error:error,
            });
        }   
})


})

//* wild card character = any url that contains forward slash after help
app.get('/help/*',(req,res)=>{
    res.status(404).render('404',{
        error:"Help article not found",
    })
})

app.get('*',(req,res)=>{
    res.status(404).render('404',{
        error:"Page Not Found",
    })
})

//SERVER LISTENING
app.listen(port, ()=> {
    console.log("Server Running Port 3000");
});


