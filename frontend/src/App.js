import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import EditUser from "./components/EditUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>}/>
        <Route path="edit/:id" element={<EditUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
