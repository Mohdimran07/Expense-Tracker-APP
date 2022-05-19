import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import Login from "./components/Form/Login";
import SignUp from "./components/Form/SignUp";
import Profile from "./components/Profile/Profile";
import ExpenseContext from "./context-store/Expense-context";

function App() {
  const expCtx = useContext(ExpenseContext);
  const isLoggedIn = expCtx.isLoggedIn;
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && <Route path="/" element={<Dashboard />} />}
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {!isLoggedIn && <Route path="/forgot" element={<ForgotPassword />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
