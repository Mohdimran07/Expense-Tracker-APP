import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Form/Login";
import SignUp from "./components/Form/SignUp";
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
      </Routes>
    </div>
  );
}

export default App;
