const express = require("express"); 
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user")
const { courseRouter} = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


const MONGO_URI = process.env.MONGO_URI;
async function main(){ 
     mongoose.connect(MONGO_URI )
     .then(() => console.log("connection to MongoDb"))
     .catch(error => console.error("error while connectin to MongoDb", error));
     // await mongoose.connect("mongodb+srv://vbhavesh219:GLdKNb5gXUsAS351@cluster0.znlw8.mongodb.net/coursera-app");
     app.listen(3000);
}


main();