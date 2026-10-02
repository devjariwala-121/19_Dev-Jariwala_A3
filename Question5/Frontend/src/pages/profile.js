function Profile()
{
 const emp=JSON.parse(
 localStorage.getItem("employee")
 );

 return(
  <div>

   <h2>Employee Profile</h2>

   <p>Name : {emp.name}</p>

   <p>Email : {emp.email}</p>

   <p>Department : {emp.department}</p>

  </div>
 )
}

export default Profile;