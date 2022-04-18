const fs = require("fs");
var data = JSON.parse(fs.readFileSync('./cities.json'));
const request = require("request");
const hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials');
const express = require("express");
let app = express();
app.set('view engine', 'hbs');

app.get('/',(req,res) => {
    res.render('home.hbs');
});
     
hbs.registerHelper("createList", function(array,active){
      
    let result="";
    for(let i=0; i<array.length; i++){
        if(array[i]==active)
        result +=`<a href="/weather/${array[i]}" class="list-group-item list-group-item-action active">${array[i]}</a>`;
        else
        result +=`<a href="/weather/${array[i]}" class="list-group-item list-group-item-action">${array[i]}</a>`;
    }
    return new hbs.SafeString(`${result}`);
});

app.get('/weather',(req,res) => {
 
    var arr =[]; 
    data.forEach(city =>
        {
            arr.push(city.cityName)
        });
        const cities = {
            arr: arr
        }
        var url = `https://api.openweathermap.org/data/2.5/weather?q=Zhytomyr&units=metric&appid=`;
        const weatherAPI = "65f5c0331940a9a4f079ce95593053e4";
        request(url+weatherAPI, (error, response, body) =>{
            const data = JSON.parse(body)
            weather = {
                name: data.name,
                main: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
                    }
                res.render('weather.hbs',{cities, weather});
                })
});

data.forEach(city =>
    {
         
         app.get('/weather/'+city.cityName,(req,res) => {
            var url = `https://api.openweathermap.org/data/2.5/weather?q=${city.cityName}&units=metric&appid=`;
            const weatherAPI = "65f5c0331940a9a4f079ce95593053e4";
            var weather = {};
             
            var arr =[];
             data.forEach(city =>
            {
                arr.push(city.cityName)
            
            });
            const cities = {
                arr: arr
            }
            request(url+weatherAPI, (error, response, body) =>{
            const data = JSON.parse(body)
            weather = {
                name: data.name,
                main: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
                    }
                res.render('weather.hbs',{cities, weather});
                })
            
            
        });
    });




app.get('/login',(req,res) => {
    res.send("log in mf");
});

app.listen(3000, () => {
    console.log("Express app listening on port 3000");
    
});


function getLocalWeather(city)
{
  
}
