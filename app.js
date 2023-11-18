const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs = require("ejs");

const app = express();

var apiKey = "b467c20d83fd4fed8585fc140a4ff498";

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const newsApi = await axios.get(`https://newsapi.org/v2/everything?q=worldwide&sortBy=publishedAt&apiKey=${apiKey}`);
        var data = newsApi.data;
        res.render("news", { Data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/india", async (req, res) => {
    try {
        const searchTerm = "India";
        const newsApi = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${apiKey}`);
        var data = newsApi.data;
        res.render("news", { Data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/sports", async (req, res) => {
    try {
        const searchTerm = "sports";
        const newsApi = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${apiKey}`);
        var data = newsApi.data;
        res.render("news", { Data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/tech", async (req, res) => {
    try {
        const searchTerm = "technology";
        const newsApi = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${apiKey}`);
        var data = newsApi.data;
        res.render("news", { Data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/new", async (req, res) => {
    var searchTerm = req.body.ne;
    try {
        const newsApi = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${apiKey}`);
        var data = newsApi.data;
        res.render("news", { Data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, function () {
    console.log("server active at port 3000");
})
