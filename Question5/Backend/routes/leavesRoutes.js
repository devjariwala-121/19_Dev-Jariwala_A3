const express=require("express");

const Leave=require("../models/Leave");
const auth=require("../middleware/auth");

const router=express.Router();

router.post("/add",auth,async(req,res)=>{

    const leave=new Leave({
        employeeId:req.user.id,
        date:req.body.date,
        reason:req.body.reason,
        grant:req.body.grant
    });

    await leave.save();

    res.json({
        message:"Leave Added"
    });

});

router.get("/list",auth,async(req,res)=>{

    const leaves=await Leave.find({
        employeeId:req.user.id
    });

    res.json(leaves);

});

module.exports=router;