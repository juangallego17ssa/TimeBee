import { useNavigate } from "react-router";
import TimeBeeLogo from '../assets/TimeBeeNav.png';


function Home() {
  const navigate = useNavigate()

  const handleGoToLogin = (e) => {
    navigate("/login")
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-full bg-stone-100 box-border">
      <div className="flex flex-col justify-start items-center w-3/4 h-3/4 shadow-2xl border-2 rounded-lg mt-10 bg-stone-100">
        <div className="text-5xl text-center font-semibold m-12">
          Here we create a stuning new TimeTracker for Busy Bee's
        </div>
        <div className="text-xl text-center font-semibold m-6">
          If you want to know where you spend your precious time try our
          Tracker today just click on the button below
        </div>
        <button onClick={handleGoToLogin} className="flex flex-wrap justify-center items-center my-8 text-white font-medium text-2xl w-72 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500">
          FLY WITH US NOW
        </button>
        <img src={TimeBeeLogo} alt="Site logo Timebee"></img>
      </div>
    </div>
  );
  }
  
  export default Home;