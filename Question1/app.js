const express = require("express");
const path = require("path");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.set("view engine", "ejs");

// Multer Storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

// Home Route

app.get("/", (req, res) => {
    res.render("form", {
        errors: [],
        old: {}
    });
});

// Form Submit

app.post(
    "/register",
    upload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "otherPics", maxCount: 5 }
    ]),

    [
        body("username")
            .notEmpty()
            .withMessage("Username is required"),

        body("email")
            .isEmail()
            .withMessage("Enter valid email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be 6 characters"),

        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            }),

        body("gender")
            .notEmpty()
            .withMessage("Select gender")
    ],

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("form", {
                errors: errors.array(),
                old: req.body
            });
        }

        const profilePic = req.files.profilePic
            ? req.files.profilePic[0].filename
            : "";

        const otherPics = req.files.otherPics
            ? req.files.otherPics.map(file => file.filename)
            : [];

        res.render("result", {
            data: req.body,
            profilePic,
            otherPics
        });
    }
);

// Download Route

app.get("/download/:filename", (req, res) => {

    const filePath = path.join(
        __dirname,
        "uploads",
        req.params.filename
    );

    res.download(filePath);
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});