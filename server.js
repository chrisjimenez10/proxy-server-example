//Import
const express = require("express");
const app = express();
    //Importing CORS - Allows for requests to happend between two web services/applicaitons that are in different domains or ports (NOTE: for security reasons, it is considered unsafe and risky to accept requests from sources OUTSIDE of the domain/port for the source with data, so we ALLOW that with CORS)
const cors = require("cors");
require("dotenv").config();

//Data

const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}`;

app.use(cors()); //CORS is an Express middleware package, so it MUST go ABOVE our route handler - Now, this is telling our express app to allow requests from other domains and ports (NOTE: we are using this proxy server for our react-weather-app that fetches data from the Weather API - Both applications live in different ports, so since we are using this proxy server to fetch data our weather React app needs we MUST use CORS)

//Routes
app.get("/weather/:city", async (req, res)=>{
    const {city} = req.params; //Destructure city from req.params
    const queryString = `&q=${city}`; //Create a querystring using "city"
    const apiRes = await fetch(BASE_URL + queryString); //Make the fetch request
    const data = await apiRes.json(); //Parse the response
    res.json(data); //Respond to the request with the data
});

//Server
app.listen(3005, ()=>{
    console.log("Server running on port 3005");
});

