import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";
function UserPermission() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("/api/v1/user/getalluser", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("responce : ", response);
        

        setUsers(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Customers <span className="text-sm">(total:
        {users
          .filter((user) => user.role === "user").length+ " "}
         Customers)</span></h2>

      {isLoading ? (
        <p> {<Loading />} </p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">S.N</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-3 text-center">
                  No customers here
                </td>
              </tr>
            ) : (
              users
                .filter((user) => user.role === "user")
                .map((user, index) => (
                  <tr key={user.id} className="text-center border">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{user.fullName}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{user.phone}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserPermission