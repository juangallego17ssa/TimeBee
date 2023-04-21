import { useValidateRegistrationMutation, useCreateProjectByUsernameMutation } from "../api/API";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosWithoutToken } from "../api/axios";



function Verification() {
  const registrationEmail = useSelector(
    (state) => state.signupemail.signupemail
  );

  

  const [workload, setWorkload] = useState("")
  const handleWorkloadChange = (event) => {
    setWorkload(event.target.value);
  }

  

  const [userEmail, setEmail] = useState(registrationEmail);
  const [userPassword, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  //store typed email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  //store typed password
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  //store typed repeat password
  const handleRepeatPasswordInput = (e) => {
    setRepeatPassword(e.target.value);
  };

  //check if passwords match
  useEffect(() => {
    checkPasswordMatch();
  }, [repeatPassword, userPassword]);

  const checkPasswordMatch = () => {
    if (repeatPassword !== "" && repeatPassword !== userPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  //store typed username
  const handleUserNameInput = (e) => {
    setUserName(e.target.value);
  };

  //store typed firstname
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };

  //store typed lastname
  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };

  //store typed verification code
  const handleVerificationCodeInput = (e) => {
    setVerificationCode(e.target.value);
  };

  //validation
  const handleActivateClick = async (e) => {
    e.preventDefault();

    if (
      !userEmail ||
      !userName ||
      !verificationCode ||
      !userPassword ||
      !repeatPassword ||
      !firstName ||
      !lastName ||
      !workload
    ) {
      setError("Every field is required.");
      return;
    } else {
      let emessage = "";

      //registration request to API
      await axiosWithoutToken
        .patch(
          "registration/validate/",
          JSON.stringify({
            email: userEmail,
            username: userName,
            code: verificationCode,
            password: userPassword,
            password_repeat: repeatPassword,
            first_name: firstName,
            last_name: lastName,
            workload: workload,
          })
        )
        .catch((error) => (emessage = error.message));

      //console.log("68: "+emessage);
      if (!emessage) {
        //redirect to login page
        navigate("/login");

        return;
      } else {
        alert(emessage);
      }
    }
  };

  return (
    <div className="page flex flex-col justify-center items-center w-full h-full md:flex-col">
      <div className="flex flex-col justify-center items-center w-[350px] h-[600px] shadow-2xl border-2 rounded-lg">
        <div className="flex flex-col items-center w-60 my-4">
          <div className="flex font-semibold text-3xl">VERIFICATION</div>
        </div>
        <form className="form flex flex-col justify-center gap-4">
          {error && <div className="text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email address"
            value={userEmail}
            onChange={handleEmailInput}
            required
            className="Email flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="text"
            placeholder="Validation Code"
            value={verificationCode}
            onChange={handleVerificationCodeInput}
            required
            className="validationcode flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleUserNameInput}
            required
            className="username flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameInput}
            required
            className="username flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameInput}
            required
            className="username flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="text"
            placeholder="Workload in % (e.g. 80%)"
            value={workload}
            onChange={handleWorkloadChange}
            className="workload flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={handlePasswordInput}
            required
            className="password1 flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <input
            type="password"
            placeholder="Password repeat"
            value={repeatPassword}
            onChange={handleRepeatPasswordInput}
            required
            className="password2 flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"
          />
          <p
            style={
              passwordMatch
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            The passwords don't match
          </p>
          <div className="buttonwrap flex flex-wrap flex-col justify-center items-center w-60 h-10">
            <button
              onClick={handleActivateClick}
              className="flex justify-center items-center border-solid rounded-full text-white w-52 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500"
            >
              Finish registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verification;