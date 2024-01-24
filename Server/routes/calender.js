const express = require("express");
const user = require("../Models/user");
const calender = require("../Models/calender");
const router = express.Router();

router.post("/calender-add" , async (req , res) => {
    try{
        const{event_name,event_date,event_time,event_description,user_id } = req.body;
        const userIdObject = mongoose.Types.ObjectId(user_id);
        const userid =  await user.findOne(userIdObject);
        if(!userid){
            return res.status(404).json({"message": "user not found"});
        }
        const calenderevent = new calender({
            event_name,
            event_date,
            event_time,
            event_description,
            user_id
        }); 
        await calenderevent.save();
        res.status(200).json({"message":"calander Item Added Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(400).json({"message" : "Internal Server Error"});
    }

});
module.exports = router;