import React, { useEffect, useState } from "react";

import CreateCard from "../workspace_components/CreateCard";
import WorkspaceCard from "../workspace_components/WorkspaceCard";
import axios from "axios";
import { useBoards } from "../context/Globalcontext";
import CreateBooard from "../components/CreateBooard";

const Dashboard = () => {


  


  const { boards, addBoard } = useBoards();

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

        <CreateBooard />

      </div>

     

    </div>
  );
};

export default Dashboard;