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
import Profil from "./pages/Profil";
import DataProject from "./Components/DataProject";

function App() {
  return (
    <>
    <Provider store={store}>
      <div className="flex box-border flex-col w-sceen h-screen bg-stone-100" >
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<Verification/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<RouteProtection route={<Header><Timetracker/></Header>} />} />
            <Route path="/dashboard" element={<RouteProtection route={<Header><Dashboard /></Header>} />}/>
            <Route path="/reports" element={<RouteProtection route={<Header><Report/></Header>}/>}/>
            <Route path="/calendar" element={<RouteProtection route={<Header><Calendar /></Header>} />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/data" element={<DataProject/>} />
          </Routes>
      </div>
    </Provider>
    </>
  );
}

export default App;
