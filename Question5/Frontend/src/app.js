import {BrowserRouter,Routes,Route}
from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Leave from "./pages/leave";

function App()
{
 return(
  <BrowserRouter>

    <Routes>

      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/leave" element={<Leave/>}/>

    </Routes>

  </BrowserRouter>
 )
}

export default App;