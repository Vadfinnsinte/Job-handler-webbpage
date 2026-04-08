import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authRegister";
import InputLabel from "../components/InputLabel";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  const [btnTxT, setbtnTxT] = useState("Sign up");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const registerNewUser = async () => {
    try {
      setError("");
      setbtnTxT("Signing up...");

      await registerUser(email, password, userName, name);

      navigate("/");
    } catch (err) {
      let message = err.message;
      message = message.replace(/[\[\]"]/g, "");
      setError(message);
    } finally {
      setbtnTxT("Sign up");
    }
  };

  return (
    <div className="sign-up-in-layout">
      <h1>Job handler</h1>
      <div className="sign-up-in-container ">
        <div className="input-label-layout">
          <h2>Register</h2>
          <InputLabel
            type={"email"}
            labelTxt={"Email"}
            value={email}
            setValue={setEmail}
            placeholder="johndoe@gmail.com"
          />
          <InputLabel
            type={"password"}
            labelTxt={"Password"}
            value={password}
            setValue={setPassword}
            placeholder="********"
          />
          <InputLabel
            type={"text"}
            labelTxt={"Username"}
            value={userName}
            setValue={setUserName}
            placeholder="johnD65"
          />
          <InputLabel
            type={"text"}
            labelTxt={"Name"}
            value={name}
            setValue={setName}
            placeholder="John"
          />

          {error && (
            <div className="error">
              {error.split(",").map((part, index) => (
                <p key={index}>{part.trim()}</p>
              ))}
            </div>
          )}
          <div className="flex margin-top-1">
            <button onClick={registerNewUser}>{btnTxT}</button>
            <div className="btn-line-container">
              <div className="line"></div>
              <p>or</p>
              <div className="line"></div>
            </div>
            <button onClick={() => navigate("/")}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
