const express=require("express")
const mongoose=require("mongoose")
const session=require("express-session")
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")

const Employee=require("./Models/employee")
const app=express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:"my-secret-key",
    resave:false,
    saveUninitialized:false
}));

mongoose.connect("mongodb://127.0.0.1:27017/erpdb")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const Admin_uaername="admin"
const Admin_password="1234"

app.get("/",(req,res)=>{
    res.render("login",{
        error:""
    });
});

app.post("/login",(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    if(username===Admin_uaername && password===Admin_password){
        req.session.admin=username

        res.redirect("/dashboard")
    }else{
        res.render("login",{
            error:"Invalid Credentials!"
        });
    }
});

function checkLogin(req,res,next){
    if(req.session.admin){
        next()
    }else{
        res.redirect("/")
    }
}

app.get("/dashboard",checkLogin,async(req,res)=>{
    const employees=await Employee.find();

    res.render("dashboard",{
        employees:employees
    });
});

app.get("/employees", async (req, res) => {
    const employees = await Employee.find();
    res.render("employees", { employees });
});

app.get("/employees",checkLogin,async(req,res)=>{
    const employees=await Employee.find()

    res.render("employees",{
        employees:employees
    });
});

app.get("/employees/add",checkLogin,(req,res)=>{
    res.render("add-employee") 
})

app.post("/employees/add",checkLogin,async(req,res)=>{
    try{
        const name=req.body.username
        const email=req.body.email
        const department=req.body.department
        const basicSalary=req.body.basicSalary

        const count=await Employee.countDocuments();
        const empid="EMP"+String(count+1)

        const plainpassword=Math.random().toString(36).slice(-8)
        const encryptpassword=await bcrypt.hash(plainpassword,10)

        const basic=Number(basicSalary)
        const hra=basic*0.20
        const da=basic*0.10
        const grossSalary=hra+da+basic

        const employee=new Employee({
            empid:empid,
            name:name,
            email:email,
            department:department,
            basicSalary:basic,
            hra:hra,
            da:da,
            grossSalary:grossSalary,
            password:encryptpassword
        });
        await employee.save()

        res.redirect("/employees")
    }catch(error){
        console.log(error)
        res.send("Error While Adding Employee...!")
    }
});

app.get("/employees/edit/:id",checkLogin,async(req,res)=>{
    const employee=await Employee.findById(req.params.id)

    res.render("edit-employee",{
        employee:employee
    });
});

app.post("/employees/edit/:id",checkLogin,async(req,res)=>{
    try{ 
        const name=req.body.name
        const email=req.body.email
        const department=req.body.department
        const basicSalary=req.body.basicSalary

        const basic=Number(basicSalary)
        const hra=basic*0.20
        const da=basic*0.10
        const grossSalary=hra+da+basic

        await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name:name,
                email:email,
                department:department,
                basicSalary:basic,
                hra:hra,
                da:da,
                grossSalary:grossSalary,
            }
        );
        res.redirect("/employees")
    }catch(error){
        console.log(error)
        res.send("Error While Updating!!")
    }

});

app.get("/employees/delete/:id",checkLogin,async(req,res)=>{
    await Employee.findByIdAndDelete(req.params.id)
    res.redirect("/employees")
});

app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send("Error While Logingout!")
        }
        res.redirect("/")
    });
});

app.listen(3000,()=>{
    console.log("Server is Running...")
})