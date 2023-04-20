import {useState} from "react";
import { useNavigate } from "react-router";
import { useGetTokenMutation, useGetUserProfileQuery } from "../api/API";


function Login() {

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
    <div className="page flex flex-col justify-center items-center w-full md:flex-col p-10">
      <div className="flex flex-col justify-center items-center w-2/6">
        <div className="flex flex-row justify-between items-start w-60">
          <div className="flex text-3xl font-semibold">LOGIN</div>
          <button
            onClick={handleSignUp}
            className="flex flex-wrap justify-center items-center text-white font-small w-20 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
          >
            SignUp
          </button>
        </div>
        <div className="flex flex-row justify-center items-center my-10">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="Email flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="Email flex px-4 my-2 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
            />
            <div className="buttonwrap flex flex-col justify-center items-center w-60 h-10">
              <button
                type="submit"
                disabled={isLoading}
                className="flex flex-wrap justify-center items-center text-white w-32 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              >
                {isLoading ? "Loading..." : "LET'S FLY"}
              </button>
              {error && <p>{error}</p>}
              <div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col md:w-2/3 w-2/6"></div>
    </div>
  );
}

export default Login;