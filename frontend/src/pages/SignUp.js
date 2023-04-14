import {useState} from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="page flex flex-wrap flex-row justify-evenly items-start w-full h-5/6">
            <div>REGISTRATION</div>
            {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Email address" value={email} onChange={handleEmailChange}/>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Register"}
          </button>
        </form>
      ) : (<>
        <div>Registration successful!</div>
        <button onClick={goToCreate}>Create Profile</button>
        </>
      )}
      {isError && <div>There was an error: {error.message}</div>}
      
        </div>
    );
}

export default SignUp;
