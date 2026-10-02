const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));

app.get("/api/joke", async (req, res) => {
    try {
        const response = await axios.get(
            "https://official-joke-api.appspot.com/random_joke"
        );

        res.json(response.data);
    }
    catch(error){
        res.status(500).json({
            message:"Error Fetching Joke"
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});