import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="sign-up-in-layout">
      <h1>Job handler</h1>
      <div className="sign-up-in-container ">
        <div className="input-label-layout">
          <h2>Sign in</h2>
          <div className="input-label-container">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              placeholder="user@company.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex margin-top-1">
            <button>Sign in</button>
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
