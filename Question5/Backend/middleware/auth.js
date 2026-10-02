const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{

    const token=req.headers.authorization;

    if(!token)
    {
        return res.status(401).json({
            message:"No Token"
        });
    }

    try
    {
        const verify=jwt.verify(token,"employeeSecret");
        req.user=verify;
        next();
    }
    catch(err)
    {
        res.status(401).json({
            message:"Invalid Token"
        });
    }
}