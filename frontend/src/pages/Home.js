import { GiTreeBeehive, GiBee } from "react-icons/gi";


function Home() {
    return (
      <div className="flex-col bg-gradient-to-r bg-stone-100 w-full h-full">
          <div className="flex flex-row justify-evenly items-center w-1/4 h-1/2">
          <GiTreeBeehive className="flex flex-wrap w-full h-full text-amber-500" />
          <div className="flex flex-wrap w-1/4 h-1/4">
            <GiBee className=" animate-bounce flex flex-wrap w-full h-full text-black" />
            <button type="button" className="Login felx flew-wrap m-2 w-18">LOG IN</button>
          </div>
        </div>
        <div className="flex flex-wrap w-1/4 h-1/4 ml-20 text-amber-800 text-bold text-4xl">
          Join the Beehive
        </div>
      </div>
    );
  }
  
  export default Home;