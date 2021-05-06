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
        const price = Math.floor(Math.random() * 30) + 20;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "http://source.unsplash.com/collection/2029045",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            price // equal to ... price: price
        });
        await camp.save();
    }
}
//closing database
seedDB().then(() => {
    mongoose.connection.close();
})

// descriptors[200]