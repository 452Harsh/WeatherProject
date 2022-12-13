
const express = require("express");
const https = require("https");

const app = express();
app.get("/",function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=9cfa202c13a5bfb3f62be337acc9d8fe&units=metric#";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const temp1 = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp1);
            res.write("<p> The weather is currently " + temp1 +  "</p>");
            res.write("<h1>The temperature in paris is "+temp + " degree celcius</h1>");
            res.write("<img src=" + imageurl + ">");
            res.send()
        })
    })
})
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})




