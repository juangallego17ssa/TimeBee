import { GiTreeBeehive, GiBee } from "react-icons/gi";
import { useNavigate } from "react-router";

function Home() {

  const navigate = useNavigate()
  const goToLogIn = () => {
    navigate("/login");
  };

    return (
      <div className="flex-col bg-gradient-to-r bg-stone-100 w-full h-full">
          <div className="flex flex-row justify-evenly items-center w-1/4 h-1/2">
          <GiTreeBeehive className="flex flex-wrap w-full h-full text-amber-500" />
          <div className="flex flex-wrap w-1/4 h-1/4">
            <GiBee className=" animate-bounce flex flex-wrap w-full h-full text-black" />
            <button onClick={goToLogIn} type="button" className="Login felx flew-wrap m-2 w-20 rounded-full text-white bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">LOG IN</button>
          </div>
        </div>
        <button className="flex flex-wrap justify-center items-center w-56 h-50 ml-10 rounded-full text-white text-bold text-4xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">
          Join the Beehive
        </button>
      </div>
    );
  }
  
  export default Home;