import {useState} from "react";
import { useNavigate } from "react-router";
import { useGetTokenMutation, useGetUserProfileQuery } from "../api/API";
import { GiHoneycomb } from "react-icons/gi";


function Login() {

  const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [getToken, isLoading, error] = useGetTokenMutation();




    const handleSubmit = async (event) => {
        event.preventDefault();
        await getToken({email, password});
        navigate('/')
    };

    return (
      <div className="page flex flex-wrap flex-row justify-evenly items-start w-full h-5/6">
        <GiHoneycomb className="flex flex-col flex-wrap h-full w-1/6 text-amber-500" />
        <div className="flex flex-wrap flex-col justify-center items-start my-20">
          <div className="flex text-2xl">LOGIN</div>
          <div className="flex flex-row justify-center items-start my-10">
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="Email flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="Email flex flex-wrap px-4 my-2 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
            </form>
          </div>
          <div className="buttonwrap flex flex-wrap flex-col justify-center items-center w-full h-10">
            <button onClick={(e) => handleSubmit(e)} className="flex flex-wrap justify-center items-center text-white w-32 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">LET'S FLY</button>
          </div>
          </div>
        <GiHoneycomb className="flex flex-wrap flex-col h-full w-1/2 text-amber-500 -rotate-180"/>
      </div>
    );
}

export default Login;