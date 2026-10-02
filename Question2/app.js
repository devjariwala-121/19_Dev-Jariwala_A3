const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Session Configuration

app.use(
    session({
        store: new FileStore({
            path: "./sessions"
        }),
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false
    })
);

// Authentication Middleware

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/");
    }
}

// Login Page

app.get("/", (req, res) => {
    res.render("login", { error: "" });
});

// Login Process

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (
        username === "admin" &&
        password === "12345"
    ) {
        req.session.user = username;

        res.redirect("/dashboard");
    } else {
        res.render("login", {
            error: "Invalid Username or Password"
        });
    }
});

// Protected Route 1

app.get("/dashboard",
    isAuthenticated,
    (req, res) => {

        res.render("dashboard", {
            user: req.session.user
        });
    }
);

// Protected Route 2

app.get("/profile",
    isAuthenticated,
    (req, res) => {

        res.render("profile", {
            user: req.session.user
        });
    }
);

// Logout

app.get("/logout",
    (req, res) => {

        req.session.destroy(() => {
            res.redirect("/");
        });

    }
);

app.listen(2000, () => {
    console.log("Server Running on Port 2000");
});