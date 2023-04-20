import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./Components/HeaderComp/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Timetracker from "./pages/Timetracker";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import RouteProtection from "./Components/HOC/RouteProtection";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <>
    <Provider store={store}>
      <div className="flex box-border flex-col w-screen h-screen bg-stone-100" >
    
        <Header>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verification" element={<Verification/>} />
            <Route path="/timetracker" element={<Timetracker/>} />
            <Route path="/dashboard" element={<RouteProtection route={<Dashboard />} />}/>
            <Route path="/reports" element={<Report/>} />
            <Route path="/calendar" element={<Calendar/>} />
          </Routes>
        </Header>
      </div>
    </Provider>
    </>
  );
}

export default App;
