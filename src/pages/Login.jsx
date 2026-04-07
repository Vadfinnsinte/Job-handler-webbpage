import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../services/authLogin";
import InputLabel from "../components/InputLabel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnTxT, setbtnTxT] = useState("Sign in")

  const navigate = useNavigate();
  const signIn = async () => {
    try {
		setbtnTxT("Signing in..")
      const data = await signInUser(email, password);
	  setbtnTxT("Sign in")
      navigate("/feed");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="sign-up-in-layout">
      <h1>Job handler</h1>
      <div className="sign-up-in-container ">
        <div className="input-label-layout">
          <h2>Sign in</h2>
		  <InputLabel type={"text"} labelTxt={"Email"} value={email} setValue={setEmail}/>
		  <InputLabel type={"password"} labelTxt={"Password"} value={password} setValue={setPassword}/>
          <div className="flex margin-top-1">
            <button onClick={signIn}>{btnTxT}</button>
            <div className="btn-line-container">
              <div className="line"></div>
              <p>or</p>
              <div className="line"></div>
            </div>
            <button onClick={() => navigate("/register")}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
