import {useState} from "react";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { setSignUpEmail } from "../redux/slices/signUpEmailAdress";
import { axiosWithoutToken } from "../api/axios";
// import { useRegisterUserMutation } from "../api/API";


function SignUp() {

    // const navigate = useNavigate()
    // const [isSubmitted, setIsSubmitted] = useState(false);
    // const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     await registerUser(email);
    //     setIsSubmitted(true);
        
    // };

    // const [email, setEmail] = useState("");

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // }

    // const goToCreate = ()=>{
    //     navigate('/verification')
    // }
    
    const [userEmail, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    //store typed email
    const handleEmailInput = (e) => {
      setEmail(e.target.value);
    };

    //sign up - create a new user
    const handleSignUpClick = async (e) => {
      e.preventDefault();

      if (!userEmail) {
        setError("Please enter email");
        return;
      } else {
        let emessage = "";
        dispatch(setSignUpEmail(userEmail));

        //store user email in redux for congratulations page

        //redirect to activation page

        //registration request to API
        await axiosWithoutToken
          .post(
            "registration/",
            JSON.stringify({
              email: userEmail,
            })
          )
          .catch((error) => (emessage = error.message));

        //console.log(emessage);

        if (!emessage) {
          setSuccessMessage(`
        Thanks for your registration.\n 
        `);

          setTimeout(() => {
            navigate("/verification");
          }, 10000);
        } else {
          alert("Please check your email");
        }
      }
    };




    return (
      <form>
        <h2>REGISTRATION</h2>
        {error && <div>{error}</div>}
        {successMessage ? (
          <p style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
            {successMessage}
          </p>
        ) : (
          <div>
            <input
              placeholder="Email"
              type="email"
              value={userEmail}
              onChange={handleEmailInput}
            />
            <button onClick={handleSignUpClick}>SIGN UP</button>
          </div>
        )}
        
      </form>

      // <div className="page flex flex-row justify-center items-center w-full md:flex-col p-10">
      //     <div className="flex flex-col justify-bewtween items-start w-60">
      //         <div className="flex font-semibold text-3xl">REGISTRATION</div>
      //         {!isSuccess ? (
      //         <form onSubmit={handleSubmit} className="form flex flex-col mt-10 justify-evenly items-start w-full">
      //             <input type="text" placeholder="Email address" value={email} onChange={handleEmailChange} className="Email flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
      //             <div className="form flex flex-col justify-evenly items-center w-60">
      //                 <button type="submit" disabled={isLoading} className="flex justify-center items-center border-solid rounded-full text-white w-28 h-6 mt-10 bg-gradient-to-r from-emerald-400 to-cyan-500">
      //                 {isLoading ? "Submitting..." : "Register"}
      //                 </button>
      //             </div>
      //         </form>
      //         ) : (
      //             <>
      //                 <div className="flex font-semibold text-3xl">Registration successful!</div>
      //                 <button onClick={goToCreate} className="flex justify-center items-center border-solid rounded-full text-white w-28 h-6 mt-10 bg-gradient-to-r from-emerald-400 to-cyan-500">Create Profile</button>
      //             </>
      //             )}
      //         {isError && <div>There was an error: {error.message}</div>}
      //     </div>
      // </div>
    );
}

export default SignUp;
