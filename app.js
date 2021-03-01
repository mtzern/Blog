const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const Campground = require("./models/campground");
//=====DATABASE CONNECTION=====
mongoose.connect("mongodb://localhost:27017/yelpcamp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection; // for referencing, shorter syntax
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// ================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/campgrounds",  async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
});

app.listen(3000, () => {
    console.log("Connected to port 3000");
})

