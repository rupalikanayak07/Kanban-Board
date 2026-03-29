import React, { useState } from "react";
import axios from "axios";
import { useBoards } from "../context/Globalcontext";

const AddList = ({ boardId, existingLists }) => {
  const [showInput, setShowInput] = useState(false)
  const [title, setTitle] = useState("")

  const { addList } = useBoards()

  const token = localStorage.getItem("access");

  const handleAddList = async () => {
    if (!title.trim()) return;

    try {
      // Auto-increment position based on existing lists
      const position = existingLists ? existingLists.length + 1 : 1;

      const res = await axios.post(
        "http://127.0.0.1:8000/api/lists/",
        {
          title: title,
          board: boardId,
          position: position,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      addList({ ...res.data, tasks: [] });
      setTitle("");
      setShowInput(false);

    } catch (err) {
      console.log("Error creating list:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-w-[250px]">

      {!showInput && (
        <div
          onClick={() => setShowInput(true)}
          className="h-20 flex items-center justify-center bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300"
        >
          <span className="font-semibold text-gray-700">
            + Add List
          </span>
        </div>
      )}


      {showInput && (
        <div className="bg-white p-4 rounded-2xl shadow">
          <input
            type="text"
            placeholder="Enter list title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddList}
              className="bg-purple-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>

            <button
              onClick={() => setShowInput(false)}
              className="text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddList;