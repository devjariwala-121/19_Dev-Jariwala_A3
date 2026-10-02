const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const Employee=require("../models/Employee");

const router=express.Router();

router.post("/register",async(req,res)=>{

    const {name,email,password,department}=req.body;

    const hash=await bcrypt.hash(password,10);

    const emp=new Employee({
        name,
        email,
        password:hash,
        department
    });

    await emp.save();

    res.json({
        message:"Registered"
    });

});

router.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    const emp=await Employee.findOne({email});

    if(!emp)
    {
        return res.json({
            message:"Employee Not Found"
        });
    }

    const match=await bcrypt.compare(password,emp.password);

    if(!match)
    {
        return res.json({
            message:"Wrong Password"
        });
    }

    const token=jwt.sign(
        {
            id:emp._id
        },
        "employeeSecret"
    );

    res.json({
        token,
        employee:emp
    });

});

router.get("/profile/:id",async(req,res)=>{

    const employee=await Employee.findById(req.params.id);

    res.json(employee);
});

module.exports=router;