import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/admin/adminSlice";
import EditUserModal from "../../components/EditUserModal";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/get-all-users", {
        method: "GET",
        credentials: 'include',
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (id) => {
    const user = users.find((u) => u._id === id);
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const res = await fetch(`/api/admin/update-user/${updatedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: updatedUser.username,
          email: updatedUser.email,
        }),
      });

      if (!res.ok) toast.error("Failed to update user");

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
      setIsEditModalOpen(false);
      setSelectedUser(null);
      toast.success("Successfully updated user");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const handleDelete = (id) => {
    const user = users.find((u) => u._id === id);
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDeleteUser = async () => {
    try {
      const res = await fetch(`/api/admin/delete-user/${userToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!res.ok) {
        toast.error("Failed to delete user");
        return;
      }
  
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };
  

  const handleCreateUser = () => {
    alert("Open create user modal or form");
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: "POST",
      });
      dispatch(logoutUser());
      navigate("/admin-login");
    } catch (error) {
      console.log('Logout failed :', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={handleCreateUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Create User
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-4 text-gray-700">Users</h2>
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.username}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        user={userToDelete}
      />

    </div>
  );
};

export default Dashboard;
