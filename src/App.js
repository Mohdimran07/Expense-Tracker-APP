// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import Login from "./components/Form/Login";
import SignUp from "./components/Form/SignUp";
import Profile from "./components/Profile/Profile";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const navigate = useNavigate();
  //   useEffect(() => {
  //   const userId = localStorage.getItem("Id");
  //   if (userId) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && <Route  path="/" element={<Dashboard />} />}
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {!isLoggedIn && <Route path="/forgot" element={<ForgotPassword />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
