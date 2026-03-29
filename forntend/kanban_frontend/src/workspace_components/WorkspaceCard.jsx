import React from "react";
import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({ name, created_at, members,...board }) => {

  const navigate = useNavigate();

  return (
    <div className="bg-white p-7 rounded-xl shadow-sm border hover:shadow-md transition w-[260px]" onClick={() => navigate(`/board/${board.id}`)}>




      <h3 className="font-semibold text-gray-800">{name}</h3>


      <p className="text-sm text-gray-500">
        <span className="">Created:</span>{" "}
        {new Date(created_at).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>

     
    </div>
  );
};

export default WorkspaceCard;