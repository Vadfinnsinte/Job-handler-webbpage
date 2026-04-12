import { useEffect, useState } from "react";
import { getAllUsers } from "../services/usersAdmin";

const AdminUserList = ({ closeList }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorTxt, setErrorTxt] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setErrorTxt("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-user-list self-center">
      <div className="admin-user-list-header">
        <h2>All users</h2>

        <button onClick={closeList} type="button" className="close-btn">
          ✕
        </button>
      </div>

      {loading && <p>Loading users...</p>}
      {errorTxt && <p>{errorTxt}</p>}

      {!loading && !errorTxt && (
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="Username">{user.userName}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Name">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
