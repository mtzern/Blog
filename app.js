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

app.use(express.urlencoded({extended: true})); // parses incoming requests with urlencoded payloads

app.get("/", (req, res) => {
    res.render("home");
});
//=====Campgrounds page, shows all campgrounds=====
app.get("/campgrounds",  async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
});
//=====Campgrounds new page=====
// ordered above the show page, otherwise it wouldnt work properly
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
 });
 //=====Campgrounds create page=====
app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground); //adding to model
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`); //redirects to created campground
 })
//=====Campgrounds show page, shows individual campground=====
app.get("/campgrounds/:id", async (req,res) => {
    const campground = await Campground.findById(req.params.id);  // finding corresponding campground's id
    res.render("campgrounds/show", {campground});
});



app.listen(3000, () => {
    console.log("Connected to port 3000");
})

