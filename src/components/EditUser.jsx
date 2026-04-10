import { useState } from "react";
import InputLabel from "./InputLabel";

const EditUser = ({ setEditUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [employStatus, setEmployStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  return (
    <div className="show-info no-overflow">
      <div className="flex-end">
        <button onClick={() => setEditUser(false)}>X</button>
      </div>
      <h1>Edit</h1>
      <InputLabel
        type={"email"}
        labelTxt={"Email"}
        value={email}
        setValue={setEmail}
      />
      <InputLabel
        type={"text"}
        labelTxt={"Name"}
        value={name}
        setValue={setName}
      />
      <InputLabel
        type={"text"}
        labelTxt={"Username"}
        value={userName}
        setValue={setUserName}
      />
      <InputLabel
        type={"number"}
        labelTxt={"Phonenumber"}
        value={phone}
        setValue={setPhone}
      />

      <label>Are you currently employed?</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="employment"
            value="true"
            checked={employStatus === true}
            onChange={() => setEmployStatus(true)}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="employment"
            value="false"
            checked={employStatus === false}
            onChange={() => setEmployStatus(false)}
          />
          No
        </label>
      </div>
      <button className="margin-top-1">Save changes</button>

      <button className="margin-top-1">change password</button>

      {changePassword && (
        <InputLabel
          type={"password"}
          labelTxt={"Current password"}
          value={password}
          setValue={setPassword}
        />
      )}
    </div>
  );
};

export default EditUser;
