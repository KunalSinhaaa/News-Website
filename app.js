const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs = require("ejs");
const pg = require("pg");

const app = express();

var apiKey = "b467c20d83fd4fed8585fc140a4ff498";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Notes",
    password: "postgres",
    port: 5432
});

db.connect();

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/", async(req,res) => {
    var email = req.body.email;
    var pass = req.body.pass;

    const result = await db.query("SELECT pass FROM users WHERE email =$1", [email,]);

    if (result.rows.length !== 0) {
        if (result.rows[0].pass === pass) {
            res.redirect("/home");
        }
        else {
            res.send("sorry!!! unsuccessful, incorrect password");
        }
    }
    else {
        res.send("User Not Signed up");
    }
})

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/signup", async (req, res) => {
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var eemail = req.body.email;
    var pass = req.body.password;

    await db.query("INSERT INTO users (first_name,last_name,email,pass) values ($1,$2,$3,$4)", [fName, lName, eemail, pass,]);

    res.redirect("/home");
})

app.get("/home", async (req, res) => {
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
    var searchTerm = req.body.search;
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
