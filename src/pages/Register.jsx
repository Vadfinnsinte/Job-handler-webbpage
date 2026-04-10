import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authRegister";
import { signInUser } from "../services/authLogin";
import InputLabel from "../components/InputLabel";
import { storeHooks } from "../store/storeHooks";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  const [btnTxT, setbtnTxT] = useState("Sign up");
  const [error, setError] = useState("");

  const { addingAdmin, setAddingAdmin, isAdmin, setAddedAdminUser } =
    storeHooks();

  const navigate = useNavigate();

  const registerNewUser = async () => {
  if (btnTxT === "Signing up...") return;
  // VALIDATION
  if (!email || !password || !userName || !name) {
    setError("All fields are required");
    return;
  }

  try {
    setError("");
    setbtnTxT("Signing up...");

    await registerUser(email, password, userName, name, addingAdmin, isAdmin);
    await signInUser(email, password);

    if (!addingAdmin && !isAdmin) {
      navigate("/feed");
    } else {
      setAddingAdmin(false);
      setAddedAdminUser(true);
    }

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
      {!addingAdmin && <h1>Job handler</h1>}
      <div className="sign-up-in-container ">
        <div className="input-label-layout">
          <h2>Register{addingAdmin && " Admin"}</h2>
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
          {!addingAdmin ? (
            <div className="flex margin-top-1">
              <button onClick={registerNewUser}>{btnTxT}</button>
              <div className="btn-line-container">
                <div className="line"></div>
                <p>or</p>
                <div className="line"></div>
              </div>
              <button onClick={() => navigate("/")}>Sign in</button>
            </div>
          ) : (
            <div className="flex margin-top-1">
              <button className="margin-b1" onClick={registerNewUser}>
                Create
              </button>

              <button onClick={() => setAddingAdmin(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
