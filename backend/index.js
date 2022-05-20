const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    ).then( () => {
    console.log("MongoDB Connected");
})
.catch( (err) => console.log(err));

app.use("/api/pins", pinRoute) //means that when we send req to localhost/api/pins, that req will go to pinRoute which is defined as ./routes/pins
app.use("/api/users", userRoute)

app.listen(xxxx, () => {
    console.log("Backend server is running");
})
