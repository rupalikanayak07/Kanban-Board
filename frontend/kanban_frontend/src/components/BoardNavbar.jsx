import axios from "axios";
import React, { useState } from "react";

import { useBoards } from "../context/Globalcontext";

const BoardNavbar = ({ board, id }) => {
  const [showInvite, setShowInvite] = useState(false);
  const [username, setUsername] = useState("");
  const { fetchBoardData } = useBoards();

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        `http://127.0.0.1:8000/api/boards/${id}/invite/`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchBoardData(id);

      alert("User invited!");
      setShowInvite(false);


    } catch (err) {
      console.log(err.response?.data);
    }
  };
  console.log("Board full:", JSON.stringify(board, null, 2));

  return (
    <div className="h-14 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-purple-600">
        Collab Kanban
      </h1>

      <h1 className="text-lg font-semibold text-purple-600">
        {board?.name || "Loading..."}
      </h1>

      <div className="flex -space-x-2">
        {board?.members?.map((user) => (
          <div
            key={user.id}
            className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center text-sm"
          >
            {user.username[0].toUpperCase()}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">



        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm" onClick={() => setShowInvite(true)}>
          Invite
        </button>
      </div>

      {showInvite && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-80">

            <h2 className="mb-4 font-bold">Invite User</h2>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 mb-3"
            />
            <div className="flex justify-end gap-3">
              <button onClick={handleInvite} className="bg-purple-500 text-white px-4 py-2 rounded">
                Send Invite
              </button>

              <button onClick={()=>setShowInvite(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BoardNavbar;