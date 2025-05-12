// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Messages() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/admin/messages",{ withCredentials: true }).then((res) => {
//       setMessages(res.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
//       <div className="space-y-4">
//         {messages.map((msg) => (
//           <div key={msg._id} className="p-4 border rounded bg-white shadow">
//             <p><strong>Name:</strong> {msg.name}</p>
//             <p><strong>Email:</strong> {msg.email}</p>
//             <p><strong>Message:</strong> {msg.message}</p>
//             <p className="text-sm text-gray-500">Sent at: {new Date(msg.createdAt).toLocaleString()}</p>
//             <a href={`mailto:${msg.email}`} className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded">
//               Reply
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Messages;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Messages() {
//     const [messages, setMessages] = useState([]);
//     const [selectedMessage, setSelectedMessage] = useState(null);
//     const [subject, setSubject] = useState("");
//     const [replyText, setReplyText] = useState("");
//     const [successMsg, setSuccessMsg] = useState("");
//     const [replyStatus, setReplyStatus] = useState("");

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/admin/messages", { withCredentials: true })
//             .then((res) => {
//                 setMessages(res.data);
//             });
//     }, []);

//     const handleReplySubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post("http://localhost:5000/api/admin/reply", {
//                 to: selectedMessage.email,
//                 subject,
//                 text: replyText,
//                 messageId: selectedMessage._id,
//             }, { withCredentials: true });

//             setReplyStatus("✅ Reply sent successfully!");
//             setSelectedMessage(null);
//             setSubject("");
//             setReplyText("");

//             setTimeout(() => setSuccessMsg(""), 3000);
//         } catch (err) {
//             setReplyStatus("❌ Failed to send reply.");
//         }
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
//             {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

//             <div className="space-y-4">
//                 {messages.map((msg) => (
//                     <div key={msg._id} className="p-4 border rounded bg-white shadow">
//                         <p><strong>Name:</strong> {msg.name}</p>
//                         <p><strong>Email:</strong> {msg.email}</p>
//                         <p><strong>Message:</strong> {msg.message}</p>
//                         <p className="text-sm text-gray-500">Sent at: {new Date(msg.createdAt).toLocaleString()}</p>
//                         <p><strong>Status:</strong>
//                             {msg.isReplied
//                                 ? <span className="text-green-600"> Replied</span>
//                                 : <span className="text-red-600"> Not replied</span>}
//                         </p>
//                         {!msg.isReplied && (
//                             <button
//                                 onClick={() => setSelectedMessage(msg)}
//                                 className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded"
//                             >
//                                 Reply
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {selectedMessage && (
//                 <form onSubmit={handleReplySubmit} className="mt-8 bg-gray-100 p-6 rounded shadow">
//                     <h3 className="text-xl font-semibold mb-4">Reply to {selectedMessage.email}</h3>
//                     <div className="mb-3">
//                         <label className="block font-medium">Subject</label>
//                         <input
//                             type="text"
//                             className="w-full p-2 border rounded"
//                             value={subject}
//                             onChange={(e) => setSubject(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="block font-medium">Message</label>
//                         <textarea
//                             className="w-full p-2 border rounded"
//                             value={replyText}
//                             onChange={(e) => setReplyText(e.target.value)}
//                             rows={5}
//                             required
//                         />
//                     </div>
//                     <div className="flex gap-4">
//                         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//                             Send Reply
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setSelectedMessage(null)}
//                             className="bg-gray-400 text-white px-4 py-2 rounded"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>

//             )}
//             {replyStatus && (
//                 <p className="mt-2 text-sm font-medium text-green-600">{replyStatus}</p>
//             )}
//         </div>
//     );
// }

// export default Messages;


import React, { useEffect, useState } from "react";
import axios from "axios";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [subject, setSubject] = useState("");
    const [replyText, setReplyText] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [replyStatus, setReplyStatus] = useState("");
    const [activeTab, setActiveTab] = useState("inbox"); // لتحديد التبويب النشط

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/messages", { withCredentials: true })
            .then((res) => {
                setMessages(res.data);
            });
    }, []);

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/admin/reply", {
                to: selectedMessage.email,
                subject,
                text: replyText,
                messageId: selectedMessage._id,
            }, { withCredentials: true });

            setReplyStatus("✅ Reply sent successfully!");
            setSelectedMessage(null);
            setSubject("");
            setReplyText("");

            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setReplyStatus("❌ Failed to send reply.");
        }
    };

    // فلترة الرسائل حسب التبويب
    const filteredMessages = messages.filter((msg) =>
        activeTab === "inbox" ? !msg.isReplied : msg.isReplied
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
            
            {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

            <div className="flex gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "inbox" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("inbox")}
                >
                    Inbox
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "replied" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("replied")}
                >
                    Replied
                </button>
            </div>

            <div className="space-y-4">
                {filteredMessages.map((msg) => (
                    <div key={msg._id} className="p-4 border rounded bg-white shadow">
                        <p><strong>Name:</strong> {msg.name}</p>
                        <p><strong>Email:</strong> {msg.email}</p>
                        <p><strong>Message:</strong> {msg.message}</p>
                        <p className="text-sm text-gray-500">Sent at: {new Date(msg.createdAt).toLocaleString()}</p>
                        <p><strong>Status:</strong>
                            {msg.isReplied
                                ? <span className="text-green-600"> Replied</span>
                                : <span className="text-red-600"> Not replied</span>}
                        </p>
                        {!msg.isReplied && (
                            <button
                                onClick={() => setSelectedMessage(msg)}
                                className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded"
                            >
                                Reply
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {selectedMessage && (
                <form onSubmit={handleReplySubmit} className="mt-8 bg-gray-100 p-6 rounded shadow">
                    <h3 className="text-xl font-semibold mb-4">Reply to {selectedMessage.email}</h3>
                    <div className="mb-3">
                        <label className="block font-medium">Subject</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block font-medium">Message</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={5}
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            Send Reply
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedMessage(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {replyStatus && (
                <p className="mt-2 text-sm font-medium text-green-600">{replyStatus}</p>
            )}
        </div>
    );
}

export default Messages;
