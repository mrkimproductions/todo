const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("This is a test endpoint")
})

app.listen(9090, () => {
    console.log("Server is listening on port 9090");
})
