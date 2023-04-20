import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUpEmail } from "../redux/Slices/signUpEmailAdress";
import { axiosWithoutToken } from "../api/axios";

function SignUp() {


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
        setSuccessMessage(`Thanks for your registration.\n
        Please check your inbox for your verification Code.\
        You will be redirected automatically to the verifcation process.
        `);

        setTimeout(() => {
          navigate("/verification");
        }, 5000);
      } else {
        alert("Please check your email");
      }
    }
  };

 
  return (
    <div className="page flex flex-col justify-center items-center w-full h-full md:flex-col">
      <div className="flex flex-col justify-center items-center w-[350px] h-[400px] shadow-2xl border-2 rounded-lg">
        <div className="flex flex-col items-center w-60 my-4">
          <div className="flex font-semibold text-3xl">SIGNUP</div>
        </div>
        <form
          onSubmit={handleSignUpClick}
          className="form flex flex-col justify-center"
        >
          <div className="flex flex-col justify-between  w-60">
            {error && <div className="text-center my-2">{error}</div>}
            {successMessage ? (
              <p className="text-center my-5 flex justify-center items-center">
                {successMessage}
              </p>
            ) : (
              <input
                type="text"
                placeholder="Email address"
                value={userEmail}
                onChange={handleEmailInput}
                className="Email flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
              />
            )}
            <div className="form flex flex-col justify-start items-center w-60">
              <button
                type="submit"
                className="flex justify-center items-center border-solid rounded-full text-white w-28 h-6 mt-10 bg-gradient-to-r from-emerald-400 to-cyan-500"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


export default SignUp;
