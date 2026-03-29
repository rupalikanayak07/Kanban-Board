import React from "react";

import { Link } from "react-router-dom";
import { useBoards } from "../context/Globalcontext";

const Sidebar = () => {
  const { boards, loading } = useBoards();

  return (
    <div className="w-64 h-screen bg-[#f8fafc] border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-lg font-bold mb-6">⚡ TaskFlow</h1>

        <p className="text-xs text-gray-400 mb-2">YOUR BOARDS</p>
        <ul className="space-y-2">
          {loading ? (
            <li className="text-gray-400">Loading...</li>
          ) : boards.length > 0 ? (
            boards.map((board) => (
              <li
                key={board.id}
                className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200"
              >
                <Link to={`/board/${board.id}`}>{board.name}</Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No boards yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;