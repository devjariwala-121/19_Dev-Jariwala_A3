const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    department:String
});

module.exports=mongoose.model("Employee",employeeSchema);