import {useState} from "react";
import {  useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../api/API";


function SignUp() {

    const navigate = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerUser(email);
        setIsSubmitted(true);
        
    };

    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const goToCreate = ()=>{
        navigate('/verification')
    }
    
    




    return (
      
      <div className="page flex flex-row justify-center items-center w-full md:flex-col p-10">
          <div className="flex flex-col justify-bewtween items-start w-60">
              <div className="flex font-semibold text-3xl">REGISTRATION</div>
              {!isSuccess ? (
              <form onSubmit={handleSubmit} className="form flex flex-col mt-10 justify-evenly items-start w-full">
                  <input type="text" placeholder="Email address" value={email} onChange={handleEmailChange} className="Email flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                  <div className="form flex flex-col justify-evenly items-center w-60">
                      <button type="submit" disabled={isLoading} className="flex justify-center items-center border-solid rounded-full text-white w-28 h-6 mt-10 bg-gradient-to-r from-emerald-400 to-cyan-500">
                      {isLoading ? "Submitting..." : "Register"}
                      </button>
                  </div>
              </form>
              ) : (
                  <>
                      <div className="flex font-semibold text-3xl">Registration successful!</div>
                      <button onClick={goToCreate} className="flex justify-center items-center border-solid rounded-full text-white w-28 h-6 mt-10 bg-gradient-to-r from-emerald-400 to-cyan-500">Create Profile</button>
                  </>
                  )}
              {isError && <div>There was an error: {error.message}</div>}
          </div>
      </div>
    );
}

export default SignUp;
