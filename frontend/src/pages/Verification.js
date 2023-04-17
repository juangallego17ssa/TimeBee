import { useValidateRegistrationMutation } from "../api/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Verification() {

    const navigate = useNavigate()
    const [registerUser, { isLoading, isSuccess, isError, error }] = useValidateRegistrationMutation();
    const [email, setEmail] = useState("")
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const [validationCode, setValidationCode] = useState("")
    const handleValidationCodeChange = (event) => {
        setValidationCode(event.target.value);
    }

    const [userName, setUserName] = useState("")
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const [firstName, setFirstName] = useState("")
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const [lastName, setLastName] = useState("")
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const [workload, setWorkload] = useState("")
    const handleWorkloadChange = (event) => {
        setWorkload(event.target.value);
    }

    const [password, setPassword] = useState("")
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const [passwordRepeat, setPasswordRepeat] = useState("")
    const handlePasswordRepeatChange = (event) => {
         setPasswordRepeat(event.target.value);
    }

    const handleClick = async (event) => {
        console.log(email)
        registerUser({ email, validation_code: validationCode, username: userName, workload, password, first_name: firstName, last_name: lastName, password_repeat: passwordRepeat })
    }

    const goToHome =  () => {
        navigate('/home')
    }
    const goToLogin =  () => {
        navigate('/')
    }

    return (
        <div>
            <div className="page flex flex-col justify-center items-center w-full md:flex-col p-10 gap-4">
                <div className="flex justify-center items-center font-semibold text-2xl w-full">VERIFICATION</div>
                {isSuccess ? (<>
                    <div className="flex justify-center items-center font-semibold text-2xl w-full">Registration successful!</div>
                    <button onClick={goToLogin} className="flex justify-center items-center border-solid rounded-full text-white w-40 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500">Go to Login</button>
                    <button onClick={goToHome}className="flex justify-center items-center border-solid rounded-full text-white w-40 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500">Go to Home</button>
                    </>
                ) : (
                    <form className="form flex flex-col gap-4">
                        <input type="text" placeholder="Email address" value={email} onChange={handleEmailChange} required className="Email flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="text" placeholder="Validation Code" value={validationCode} onChange={handleValidationCodeChange} required className="validationcode flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="text" placeholder="Username" value={userName} onChange={handleUserNameChange} required className="username flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg" />
                        <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} required className="username flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg" />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} required className="username flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="text" placeholder="Workload in % (e.g. 80%)" value={workload} onChange={handleWorkloadChange} className="workload flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required className="password1 flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="password" placeholder="Password repeat" value={passwordRepeat} onChange={handlePasswordRepeatChange} required className="password2 flex px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        {isError && <div className="flex justify-center items-center font-semibold text-2xl w-full">There was an error: {error.message}</div>}
                        <div className="buttonwrap flex flex-wrap flex-col justify-center items-center w-60 h-10">
                            <button onClick={() => handleClick()} className="flex justify-center items-center border-solid rounded-full text-white w-52 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500">Finish registration</button>
                        </div>
                    </form>
                )}
            </div>
        </div>

    );
}

export default Verification;