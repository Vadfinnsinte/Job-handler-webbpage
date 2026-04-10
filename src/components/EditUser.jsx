import { useState } from "react";
import InputLabel from "./InputLabel";
import { changeUserPassword, editUser } from "../services/user.js";
import { updateUserInStorage } from "../functions/helpers/token.js";

const EditUser = ({ setEditUser, setSavedChanges, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [employStatus, setEmployStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const [error, setError] = useState("No error");
  const [haveError, setHaveError] = useState(false);

  const saveEditUser = async () => {
    try {
      await editUser(name, userName, email, phone, employStatus);
      setEditUser(false);
      completedEdit();
    } catch (err) {
      setError(err.message);
      setHaveError(true);
    }
  };

  const savePassword = async () => {
    try {
      await changeUserPassword(newPassword, password);
      setEditUser(false);
      completedEdit();
    } catch (err) {
      setError(err.message);
      setHaveError(true);
    }
  };
  const completedEdit = () => {
    setSavedChanges(true);
    updateUserInStorage(name);
    if (password && newPassword === "") {
      setUser(name);
    } else {
      setPassword("");
      setNewPassword("");
    }

    setTimeout(() => {
      setSavedChanges(false);
      setEditUser(false);
    }, 1200);
  };
  return (
    <div className="show-info no-overflow">
      <div className="flex-end">
        <button onClick={() => setEditUser(false)}>X</button>
      </div>
      {!changePassword ? (
        <>
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
          <p className={`center error ${!haveError && "invisible"}`}>{error}</p>
          <button className="margin-top-1" onClick={saveEditUser}>
            Save changes
          </button>

          <button
            className="margin-top-1"
            onClick={() => setChangePassword(true)}
          >
            Change password
          </button>
        </>
      ) : (
        <div className="flex">
          <InputLabel
            type={"password"}
            labelTxt={"Current password"}
            value={password}
            setValue={setPassword}
          />
          <InputLabel
            type={"password"}
            labelTxt={"New password"}
            value={newPassword}
            setValue={setNewPassword}
          />
          <p className={`center error ${!haveError && "invisible"}`}>{error}</p>
          <button className="margin-b1" onClick={savePassword}>
            Save
          </button>
          <button onClick={() => setChangePassword(false)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default EditUser;
