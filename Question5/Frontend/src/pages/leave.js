import axios from "axios";
import {useEffect,useState}
from "react";

function Leave()
{
 const[date,setDate]=useState("");
 const[reason,setReason]=useState("");
 const[grant,setGrant]=useState("");
 const[list,setList]=useState([]);

 const token=localStorage.getItem("token");

 const loadLeave=async()=>{

 const res=await axios.get(
 "http://localhost:5000/api/leave/list",
 {
   headers:{
      authorization:token
   }
 });

 setList(res.data);
 }

 useEffect(()=>{
   loadLeave();
 },[]);

 const saveLeave=async()=>{

 await axios.post(
 "http://localhost:5000/api/leave/add",
 {
   date,
   reason,
   grant
 },
 {
   headers:{
      authorization:token
   }
 });

 loadLeave();
 }

 return(
  <div>

   <h2>Leave Application</h2>

   <input
   type="date"
   onChange={(e)=>setDate(e.target.value)}
   />

   <br/><br/>

   <input
   placeholder="Reason"
   onChange={(e)=>setReason(e.target.value)}
   />

   <br/><br/>

   <select
   onChange={(e)=>setGrant(e.target.value)}
   >

      <option>Select</option>
      <option>Yes</option>
      <option>No</option>

   </select>

   <br/><br/>

   <button onClick={saveLeave}>
      Add Leave
   </button>

   <hr/>

   <h3>Leave List</h3>

   {
      list.map((item)=>(
         <div key={item._id}>
            <p>{item.date}</p>
            <p>{item.reason}</p>
            <p>{item.grant}</p>
            <hr/>
         </div>
      ))
   }

  </div>
 )
}

export default Leave;