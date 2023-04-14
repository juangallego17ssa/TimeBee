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

    const [location, setLocation] = useState("")
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
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
        registerUser({email, validation_code: validationCode, username: userName, location, password, password_repeat: passwordRepeat})
    }

    const goToHome =  () => {
        navigate('/')
    }
    const goToLogin =  () => {
        navigate('/login')
    }

    return (
        <div>
            <div>
                <div className="flex justify-start items-center font-semibold text-2xl w-full h-1/6">VERIFICATION</div>
                {isSuccess ? (<>
                    <div>Registration successful!</div>
                    <button onClick={goToLogin} className="flex justify-center items-center border-solid rounded-full text-white w-40 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">Go to Login</button>
                    <button onClick={goToHome}className="flex justify-center items-center border-solid rounded-full text-white w-40 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">Go to Home</button>
                    </>
                ) : (
                    <form>
                        <input type="text" placeholder="Email address" value={email} onChange={handleEmailChange} className="Email flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="text" placeholder="Validation Code" value={validationCode} onChange={handleValidationCodeChange} className="validationcode flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="text" placeholder="Username" value={userName} onChange={handleUserNameChange} className="username flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="text" placeholder="Workload in % (e.g. 80%)" value={location} onChange={handleLocationChange} className="workload flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="password1 flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        <input type="password" placeholder="Password repeat" value={passwordRepeat} onChange={handlePasswordRepeatChange} className="password2 flex flex-wrap px-4 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg"/>
                        {isError && <div>There was an error: {error.message}</div>}
                        <button onClick={() => handleClick()} className="flex justify-center items-center border-solid rounded-full text-white w-52 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">Finish registration</button>
                    </form>
                )}
            </div>
        </div>

    );
}

export default Verification;