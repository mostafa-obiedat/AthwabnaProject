import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    role: '',
  });

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/customers', {
        withCredentials: true,
      });
      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setCustomers((prev) => prev.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      phonenumber: user.phonenumber || '',
      role: user.role || '',
    });
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      phonenumber: '',
      role:'',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${editingUser._id}`, formData, {
        withCredentials: true,
      });
      fetchCustomers();
      closeEditModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">👥 Customers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer._id} className="border p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={customer.profileImage || 'https://via.placeholder.com/80'}
                alt={customer.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-bold">{customer.username}</h4>
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phonenumber}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <p>🛍 Orders: {customer.orders?.length || 0}</p>
              <p>🏠 Addresses: {customer.savedAddresses?.length || 0}</p>
              <p>❤️ Liked Products: {customer.likedProducts?.length || 0}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEditModal(customer)}
                className="px-4 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(customer._id)}
                className="px-4 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✨ Modal for Editing User */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>

            <label className="block mb-2">
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <label className="block mb-4">
              Phone Number:
              <input
                type="text"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <label className="block mb-4">
              Role:
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
