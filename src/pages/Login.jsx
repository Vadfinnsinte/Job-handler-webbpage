import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../services/authLogin";
import InputLabel from "../components/InputLabel";
import { storeHooks } from "../store/storeHooks";
import { getRole } from "../functions/helpers/token";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnTxT, setbtnTxT] = useState("Sign in");
  const [error, setError] = useState("");

  const { setIsAdmin } = storeHooks();

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      setError("");
      setbtnTxT("Signing in..");

      await signInUser(email, password);
      setbtnTxT("Sign in");
      let role = getRole();
      if (role.roles[0] === "Admin") {
        setIsAdmin(true);
      }
      navigate("/feed");
    } catch (err) {
      let message = err.message;
      message = message.replace(/[\[\]"]/g, "");
      setError(message);
    } finally {
      setbtnTxT("Sign in");
    }
  };

  return (
    <div className="sign-up-in-layout">
      <h1>Job handler</h1>
      <div className="sign-up-in-container ">
        <div className="input-label-layout">
          <h2>Sign in</h2>
          <InputLabel
            type={"text"}
            labelTxt={"Email"}
            value={email}
            setValue={setEmail}
          />
          <InputLabel
            type={"password"}
            labelTxt={"Password"}
            value={password}
            setValue={setPassword}
          />
          {error && (
            <div className="error">
              {error.split(",").map((part, index) => (
                <p key={index}>{part.trim()}</p>
              ))}
            </div>
          )}
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
