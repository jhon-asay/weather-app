const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  // Using the req.body.cityName to get the input from the user.
  const apiKey = "";
  // Please go to openweathermap.org and get your own API key to try it out.
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);
    // Using a console.log() to get feedback that the data was
    // retrieved successfully by displaying the status code.

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // JSON.parse() transfers the data in a JSON format.
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      // Using slicing to get specific values from the data object
      // to insert in the res.write() methods.
      res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>");
      res.write("<img src=" + icon + ">")
      // res.send() can only be used once, but res.write can be used
      // multiple times. the res.send() method must still be used at
      // the end.
      res.send();
    });
  });
})

app.listen(3000, function() {
  console.log("Port 3000 running...");
  // Using a console.log() to get feedback that the server is running.
});
