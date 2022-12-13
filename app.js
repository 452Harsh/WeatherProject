
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
        const query = req.body.cityName;
        const apikey = "9cfa202c13a5bfb3f62be337acc9d8fe";
        const units = "metric#";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;
        https.get(url,function(response){
            response.on("data",function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const temp1 = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                console.log(temp1);
                res.write("<p> The weather is currently " + temp1 +  "</p>");
                res.write("<h1>The temperature in "+query+" is "+temp + " degree celcius</h1>");
                res.write("<img src=" + imageurl + ">");
                res.send()
            })
        })
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})




