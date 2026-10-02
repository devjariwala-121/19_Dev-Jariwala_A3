const mongoose=require("mongoose");

const leaveSchema=new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    date:String,
    reason:String,
    grant:String
});

module.exports=mongoose.model("Leave",leaveSchema);