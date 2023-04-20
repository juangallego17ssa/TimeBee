import {useState} from "react";
import { useNavigate } from "react-router";
import { useGetTokenMutation, useGetUserProfileQuery } from "../api/API";
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';


function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [getToken, isLoading, error] = useGetTokenMutation();
  const [error, setError] = useState(null);
  const [getToken, { isLoading }] = useGetTokenMutation();

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await getToken({ email, password });
      // `unwrapResult` handles both successful and failed requests
      if (result.error) {
        throw new Error(result.error);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data?.detail ?? "Invalid entry please try again");
    }
  };

  
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    navigate('/signUp')
  };



  return (
    <div className="page flex flex-col justify-center items-center w-full h-full md:flex-col">
      <div className="flex flex-col justify-center items-center w-[350px] h-[400px] shadow-2xl border-2 rounded-lg">
        <div className="flex flex-row justify-between items-start w-60">
          <div className="flex text-3xl font-semibold">LOGIN</div>
          <button
            onClick={handleSignUp}
            className="flex flex-wrap justify-center items-center text-white font-small w-20 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
          >
            SignUp
          </button>
        </div>
        <div className="flex flex-col  items-center my-10">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="Email flex-1 px-4 my-2 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
              />
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password flex-1 px-4 my-2 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
              />
              {showPassword ? (
                <AiOutlineEye
                  className="absolute right-2"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="buttonwrap flex flex-col justify-center items-center w-60 h-20">
              <button
                type="submit"
                disabled={isLoading}
                className="flex flex-wrap justify-center items-center text-white w-32 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              >
                {isLoading ? "Loading..." : "LET'S FLY"}
              </button>
              <div className="mt-2">
              {error && <p>{error}</p>}

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;