import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login()
{
 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");

 const navigate=useNavigate();

 const login=async()=>{

   const res=await axios.post(
   "http://localhost:5000/api/auth/login",
   {
      email,
      password
   });

   localStorage.setItem(
      "token",
      res.data.token
   );

   localStorage.setItem(
      "employee",
      JSON.stringify(res.data.employee)
   );

   navigate("/home");
 }

 return(
  <div>

   <h2>Employee Login</h2>

   <input
   placeholder="Email"
   onChange={(e)=>setEmail(e.target.value)}
   />

   <br/><br/>

   <input
   type="password"
   placeholder="Password"
   onChange={(e)=>setPassword(e.target.value)}
   />

   <br/><br/>

   <button onClick={login}>
      Login
   </button>

  </div>
 )
}

export default Login;