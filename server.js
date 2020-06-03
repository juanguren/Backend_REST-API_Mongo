
const express = require("express");

const app = express();

app.use("/", require("./routes/routes"));

app.get("/", (req, res) =>{
    res.json({msg: "INDEX"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log("Server on...");
});
