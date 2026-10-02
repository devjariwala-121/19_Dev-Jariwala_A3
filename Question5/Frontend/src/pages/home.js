import {Link,useNavigate}
from "react-router-dom";

function Home()
{
 const navigate=useNavigate();

 const logout=()=>{

    localStorage.clear();

    navigate("/");
 }

 return(
  <div>

    <h1>Employee Home</h1>

    <Link to="/profile">
       Employee Profile
    </Link>

    <br/><br/>

    <Link to="/leave">
       Leave Application
    </Link>

    <br/><br/>

    <button onClick={logout}>
       Logout
    </button>

  </div>
 )
}

export default Home;