
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mi_base");

const Logs = mongoose.model("Logs", {
    date: "",
    path: String
});

module.exports = Logs;