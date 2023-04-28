import { useNavigate } from "react-router";
import TimeBeeLogo from '../assets/TimeBeeNav.png';
import Overview from '../assets/frontpage.png'


function Home() {
  const navigate = useNavigate()

  const handleGoToLogin = (e) => {
    navigate("/login")
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-full bg-stone-100 box-border">
      <div className="flex flex-col justify-start items-center w-3/4  shadow-2xl border-2 rounded-lg mt-10 bg-stone-100">
        <img src={TimeBeeLogo} alt="Site logo Timebee" className="mt-6 h-[90px]"></img>
        <div className="text-5xl text-center font-semibold m-3">
          <img src={Overview} alt="pages" className="h-[400px]"/>
        </div>
        <div className="text-xl text-center font-semibold">
          If you want to know where you spend your precious time try our
          Tracker today
        </div>
        <button onClick={handleGoToLogin} className="flex flex-wrap justify-center items-center my-6 text-white font-medium text-2xl w-72 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500">
          FLY WITH US NOW
        </button>
      </div>
    </div>
  );
  }
  
  export default Home;