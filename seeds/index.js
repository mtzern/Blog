const mongoose = require("mongoose");
const cities = require("./cities"); // at the same folder
const {places, descriptors} = require("./seedHelpers"); //destructuring from seeds file at same folder
const Campground = require("../models/campground");
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
//defining function for inserting places and descriptors
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({}); //deletes everything from db and replaces with new data
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000) + 1;
    const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();
    }
}
//closing database
seedDB().then(() => {
    mongoose.connection.close();
})

// descriptors[200]