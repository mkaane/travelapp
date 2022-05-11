const router = require("express").Router();
const Pin = require("../models/Pin");

//Create a pin
router.post("/", async (req,res) => {
    const newPin = new Pin(req.body)

    try {
        //try to save new pin
        const savedPin = await newPin.save(); //we should wait operation finish, before send response
        res.status(200).json(savedPin) //means return us the savedPin
    } catch (err) {
        res.status(500).json(err)
    }
})


//Get all pins