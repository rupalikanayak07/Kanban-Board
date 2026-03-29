import React, { useEffect, useState } from "react";

import CreateCard from "../workspace_components/CreateCard";
import WorkspaceCard from "../workspace_components/WorkspaceCard";
import axios from "axios";
import { useBoards } from "../context/Globalcontext";

const Dashboard = () => {

  // const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const token = localStorage.getItem("access");

 
 
  const { boards, addBoard } = useBoards();


  const createBoard = async () => {
    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/api/boards/",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addBoard(res.data);
      setShowModal(false);
      setName("");


    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-1">Your Workspaces</h2>
      <p className="text-gray-500 mb-6">
        Select a board to start collaborating or create a new one.
      </p>

      {/* Cards */}
      <div className="flex gap-6 flex-wrap">
        {boards.map((board) => (
          <WorkspaceCard key={board.id} {...board} />
        ))}

        <CreateCard onClick={() => setShowModal(true)} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-80 shadow-xl">

            <h2 className="text-lg font-semibold mb-4">
              Create Board
            </h2>

            <input
              type="text"
              placeholder="Board Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button
                onClick={createBoard}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;