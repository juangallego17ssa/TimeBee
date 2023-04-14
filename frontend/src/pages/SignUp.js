import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../api/API";
import { GiHoneycomb } from "react-icons/gi";


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
        <div className="page flex flex-row justify-evenly items-start w-full h-full">
            <GiHoneycomb className="flex flex-col flex-wrap h-full w-1/6 text-amber-500 opacity-90" />
            <div className="flex flex-wrap flex-col justify-center items-start w-1/6 h-1/2">
                <div className="flex justify-start items-center font-semibold text-2xl w-full h-1/6">REGISTRATION</div>
                {!isSuccess ? (
                <form onSubmit={handleSubmit} className="form flex flex-wrap flex-col justify-evenly items-start w-full h-1/3">
                    <input type="text" placeholder="Email address" value={email} onChange={handleEmailChange} className="Email flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                    <div className="form flex flex-wrap flex-col justify-evenly items-center w-60 h-1/3">
                        <button type="submit" disabled={isLoading} className="flex justify-center items-center border-solid rounded-full text-white w-32 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">
                        {isLoading ? "Submitting..." : "Register"}
                        </button>
                    </div>
                </form>
                ) : (
                    <>
                        <div>Registration successful!</div>
                        <button onClick={goToCreate}>Create Profile</button>
                    </>
                    )}
                {isError && <div>There was an error: {error.message}</div>}
            </div>
            <GiHoneycomb className="flex flex-wrap flex-col h-full w-1/2 text-amber-500 -rotate-180 opacity-90"/>
        </div>
    );
}

export default SignUp;
