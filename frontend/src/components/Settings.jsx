// import React, { useState } from 'react';
// import axios from 'axios';

// function Settings() {
//   const [storeName, setStoreName] = useState('');

//   const handleSaveSettings = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/admin/settings', { storeName });
//       alert('Settings saved!');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to save settings.');
//     }
//   };

//   return (
//     <div>
//       <h2>⚙️ Settings</h2>
//       <div>
//         <label>Store Name</label>
//         <input
//           type="text"
//           value={storeName}
//           onChange={(e) => setStoreName(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSaveSettings}>Save</button>
//     </div>
//   );
// }

// export default Settings;
import React, { useState, useEffect } from "react";
import axios from "axios";

function Settings() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/settings", { withCredentials: true })
            .then(res => {
                setName(res.data.name); // الـ name جاي من username في الباك
                setPhone(res.data.phonenumber);
            })
            .catch(() => setErrorMsg("❌ Failed to load settings."));
    }, []);

    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:5000/api/admin/update-info", {
                name,
                phone,
            }, { withCredentials: true });

            setSuccessMsg("✅ Info updated successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch {
            setErrorMsg("❌ Failed to update info.");
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMsg("❌ New passwords do not match.");
            return;
        }

        try {
            await axios.put("http://localhost:5000/api/admin/update-password", {
                oldPassword,
                newPassword,
            }, { withCredentials: true });

            setSuccessMsg("✅ Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setErrorMsg("❌ Failed to update password.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

            <form onSubmit={handleInfoUpdate} className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Update Info</h3>
                <div className="mb-3">
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">Phone</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Info</button>
            </form>

            <form onSubmit={handlePasswordUpdate} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <div className="mb-3">
                    <label className="block font-medium">Current Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">Confirm New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Password</button>
            </form>
        </div>
    );
}

export default Settings;
