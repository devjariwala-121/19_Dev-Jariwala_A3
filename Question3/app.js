const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").RedisStore;
const { createClient } = require("redis");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Redis Client
const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.connect().catch(console.error);

// Session Configuration
app.use(
    session({
        store: new RedisStore({
            client: redisClient
        }),
        secret: "mscsit",
        resave: false,
        saveUninitialized: false
    })
);

// Authentication Middleware
function auth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

// Login Page
app.get("/login", (req, res) => {
    res.render("login", { msg: "" });
});

// Login Check
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "123") {

        req.session.user = username;

        res.redirect("/dashboard");

    } else {

        res.render("login", {
            msg: "Invalid Username or Password"
        });
    }
});

// Protected Route 1
app.get("/dashboard", auth, (req, res) => {

    res.render("dashboard", {
        user: req.session.user
    });

});

// Protected Route 2
app.get("/profile", auth, (req, res) => {

    res.render("profile", {
        user: req.session.user
    });

});

// Logout
app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });

});

app.listen(3030, () => {
    console.log("Server Running on Port 3030");
});