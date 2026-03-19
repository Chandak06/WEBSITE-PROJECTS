const express = require("express");
const router = express.Router();

const {getUserStatus} = require("../services/presenceService.js");

router.get("/status/:userId",async (req,res)=>{
    try {
        const status = await getUserStatus(req.app.locals.redis,req.params.userId);
        res.json(status);
    } catch (error) {
        res.status(500).json({error : "Failed to get user status"});
    }
})

module.exports = router;