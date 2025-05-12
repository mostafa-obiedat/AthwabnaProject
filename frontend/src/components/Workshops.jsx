// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Workshops() {
//   const [workshops, setWorkshops] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     image: "",
//     description: "",
//     date: "",
//     time: "",
//     location: "",
//     ageRange: "",
//     price: "",
//     isFree: false,
//   });
//   const [editingId, setEditingId] = useState(null);

//   // Get all workshops
//   useEffect(() => {
//     fetchWorkshops();
//   }, []);

//   const fetchWorkshops = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/workshops", {
//       withCredentials: true,
//     });
//     setWorkshops(res.data);
//   };

//   // Submit (Add or Edit)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(
//           `http://localhost:5000/api/admin/workshops/${editingId}`,
//           formData,
//           { withCredentials: true }
//         );
//       } else {
//         await axios.post(
//           "http://localhost:5000/api/admin/workshops",
//           formData,
//           { withCredentials: true }
//         );
//       }
//       fetchWorkshops();
//       resetForm();
//     } catch (err) {
//       console.error("Error saving workshop:", err);
//     }
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this workshop?")) {
//       await axios.delete(`http://localhost:5000/api/admin/workshops/${id}`, {
//         withCredentials: true,
//       });
//       fetchWorkshops();
//     }
//   };

//   // Edit
//   const handleEdit = (workshop) => {
//     setFormData(workshop);
//     setEditingId(workshop._id);
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       image: "",
//       description: "",
//       date: "",
//       time: "",
//       location: "",
//       ageRange: "",
//       price: "",
//       isFree: false,
//     });
//     setEditingId(null);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Manage Workshops</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded shadow mb-6">
//         <h3 className="text-lg font-medium">{editingId ? "Edit Workshop" : "Add New Workshop"}</h3>
//         {[
//           { label: "Title", name: "title" },
//           { label: "Image URL", name: "image" },
//           { label: "Description", name: "description" },
//           { label: "Date", name: "date" },
//           { label: "Time", name: "time" },
//           { label: "Location", name: "location" },
//           { label: "Age Range", name: "ageRange" },
//           { label: "Price", name: "price", type: "number" },
//         ].map((field) => (
//           <div key={field.name}>
//             <label className="block mb-1 font-medium">{field.label}</label>
//             <input
//               type={field.type || "text"}
//               name={field.name}
//               value={formData[field.name]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [field.name]: e.target.value })
//               }
//               className="w-full p-2 border rounded"
//               required={field.name !== "image"}
//             />
//           </div>
//         ))}

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={formData.isFree}
//             onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
//           />
//           <label>Is Free?</label>
//         </div>

//         <div className="flex gap-4">
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//             {editingId ? "Update" : "Add"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Workshops List */}
//       <div className="grid gap-4 md:grid-cols-2">
//         {workshops.map((workshop) => (
//           <div key={workshop._id} className="p-4 border rounded bg-white shadow">
//             <h4 className="font-semibold text-lg mb-1">{workshop.title}</h4>
//             <p className="text-sm text-gray-600">{workshop.description}</p>
//             <p className="text-sm mt-1">📅 {workshop.date} 🕒 {workshop.time}</p>
//             <p className="text-sm">📍 {workshop.location} 👥 {workshop.ageRange}</p>
//             <p className="text-sm">💵 {workshop.isFree ? "Free" : `${workshop.price} JOD`}</p>
//             <div className="flex gap-2 mt-3">
//               <button
//                 onClick={() => handleEdit(workshop)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(workshop._id)}
//                 className="bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Workshops;


import React, { useEffect, useState } from "react";
import axios from "axios";

function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    date: "",
    time: "",
    location: "",
    ageRange: "",
    price: "",
    isFree: false,
  });
  const [editingId, setEditingId] = useState(null);

  // Get all workshops
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/workshops", {
      withCredentials: true,
    });
    setWorkshops(res.data);
  };

  // Submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("location", formData.location);
    data.append("ageRange", formData.ageRange);
    data.append("price", formData.price);
    data.append("isFree", formData.isFree);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/admin/workshops/${editingId}`,
          data,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/workshops",
          data,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      fetchWorkshops();
      resetForm();
    } catch (err) {
      console.error("Error saving workshop:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      await axios.delete(`http://localhost:5000/api/admin/workshops/${id}`, {
        withCredentials: true,
      });
      fetchWorkshops();
    }
  };

  // Edit
  const handleEdit = (workshop) => {
    setFormData({
      title: workshop.title,
      image: null, // can't set a file here
      description: workshop.description,
      date: workshop.date,
      time: workshop.time,
      location: workshop.location,
      ageRange: workshop.ageRange,
      price: workshop.price,
      isFree: workshop.isFree,
    });
    setEditingId(workshop._id);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: null,
      description: "",
      date: "",
      time: "",
      location: "",
      ageRange: "",
      price: "",
      isFree: false,
    });
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Workshops</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded shadow mb-6">
        <h3 className="text-lg font-medium">{editingId ? "Edit Workshop" : "Add New Workshop"}</h3>

        {/* Text Inputs */}
        {[
          { label: "Title", name: "title" },
          { label: "Description", name: "description" },
          { label: "Date", name: "date" },
          { label: "Time", name: "time" },
          { label: "Location", name: "location" },
          { label: "Age Range", name: "ageRange" },
          { label: "Price", name: "price", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Is Free */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isFree}
            onChange={(e) =>
              setFormData({ ...formData, isFree: e.target.checked })
            }
          />
          <label>Is Free?</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Workshops List */}
      <div className="grid gap-4 md:grid-cols-2">
        {workshops.map((workshop) => (
          <div key={workshop._id} className="p-4 border rounded bg-white shadow">
            {workshop.image && (
              <img
                src={`http://localhost:5000${workshop.image}`}
                alt={workshop.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h4 className="font-semibold text-lg mb-1">{workshop.title}</h4>
            <p className="text-sm text-gray-600">{workshop.description}</p>
            <p className="text-sm mt-1">📅 {workshop.date} 🕒 {workshop.time}</p>
            <p className="text-sm">📍 {workshop.location} 👥 {workshop.ageRange}</p>
            <p className="text-sm">💵 {workshop.isFree ? "Free" : `${workshop.price} JOD`}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(workshop)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(workshop._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workshops;
