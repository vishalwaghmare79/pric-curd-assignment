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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={editUser ? updateUser : saveUser}
          className="bg-blue-500 text-white p-2"
        >
          {editUser ? "Update User" : "Add User"}
        </button>
        {editUser && (
          <button
            onClick={cancelEdit}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => selectUserToEdit(user)}
                  className="bg-yellow-500 text-white p-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white p-2"
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
