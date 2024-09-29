"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState<User | null>(null);
  const apiUrl =
    "https://userdashboardcurd-35d3e-default-rtdb.firebaseio.com/users";

  // Fetch all users (Read operation)
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}.json`);
      const fetchedUsers = response.data
        ? Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }))
        : [];
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  // Save a new user (Create operation)
  const saveUser = async () => {
    if (newUser.name && newUser.email) {
      try {
        await axios.post(`${apiUrl}.json`, {
          name: newUser.name,
          email: newUser.email,
        });
        fetchUsers();
        setNewUser({ name: "", email: "" });
      } catch (error) {
        console.error("Error saving user: ", error);
      }
    }
  };

  // Update an existing user (Update operation)
  const updateUser = async () => {
    if (editUser && newUser.name && newUser.email) {
      try {
        await axios.put(`${apiUrl}/${editUser.id}.json`, {
          name: newUser.name,
          email: newUser.email,
        });
        setEditUser(null);
        fetchUsers();
        setNewUser({ name: "", email: "" });
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  // Delete a user (Delete operation)
  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}.json`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  // Select user to edit and populate the form
  const selectUserToEdit = (user: User) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  // Cancel the edit operation and reset form
  const cancelEdit = () => {
    setEditUser(null);
    setNewUser({ name: "", email: "" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>

      <div className="mb-8 flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full sm:w-auto"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full sm:w-auto"
        />

        <button
          onClick={editUser ? updateUser : saveUser}
          className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          {editUser ? "Update User" : "Add User"}
        </button>

        {editUser && (
          <button
            onClick={cancelEdit}
            className="bg-gray-500 text-white p-3 rounded-md shadow-md hover:bg-gray-600 transition duration-300 ml-2"
          >
            Cancel
          </button>
        )}
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } border-b`}
            >
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => selectUserToEdit(user)}
                  className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
